## 概述
BroadcastReceiver也就是“广播接收者”的意思，顾名思义，它就是用来接收来自系统和应用中的广播。

在Android系统中，广播体现在方方面面，
例如当开机完成后系统会产生一条广播，接收到这条广播就能实现开机启动服务的功能；
当网络状态改变时系统会产生一条广播，接收到这条广播就能及时地做出提示和保存数据等操作；
当电池电量改变时，系统会产生一条广播，接收到这条广播就能在电量低时告知用户及时保存进度，等等。

Android中的广播机制设计的非常出色，很多事情原本需要开发者亲自操作的，
现在只需等待广播告知自己就可以了，大大减少了开发的工作量和开发周期。
而作为应用开发者，就需要数练掌握Android系统提供的一个开发利器，那就是BroadcastReceiver。

创建广播接收者

    public class MyReceiver extends BroadcastReceiver {

        private static final String TAG = "MyReceiver";

        @Override
        public void onReceive(Context context, Intent intent) {
            String msg = intent.getStringExtra("msg");
            Log.i(TAG, msg);
        }

    }

在onReceive方法内，我们可以获取随广播而来的Intent中的数据，
这非常重要，就像无线电一样，包含很多有用的信息。
在创建完我们的BroadcastReceiver之后，还不能够使它进入工作状态，我们需要为它注册一个指定的广播地址。

下面我们就来介绍一下如何为BroadcastReceiver注册广播地址。

#### > 静态注册
在AndroidManifest.xml文件中

    <receiver android:name=".MyReceiver">
        <intent-filter>
            <action android:name="android.intent.action.MY_BROADCAST"/>
            <category android:name="android.intent.category.DEFAULT" />
        </intent-filter>
    </receiver>

配置了以上信息之后，只要是android.intent.action.MY_BROADCAST这个地址的广播，MyReceiver都能够接收的到。
这种方式的注册是常驻型的，也就是说当应用关闭后，如果有广播信息传来，MyReceiver也会被系统调用而自动运行。

#### > 动态注册
动态注册需要在代码中动态的指定广播地址并注册，通常我们是在Activity或Service注册一个广播。

    MyReceiver receiver = new MyReceiver();

    IntentFilter filter = new IntentFilter();
    filter.addAction("android.intent.action.MY_BROADCAST");

    registerReceiver(receiver, filter);

注意，registerReceiver是android.content.ContextWrapper类中的方法，
Activity和Service都继承了ContextWrapper，所以可以直接调用。
在实际应用中，我们在Activity或Service中注册了一个BroadcastReceiver，
当这个Activity或Service被销毁时如果没有解除注册，
系统会报一个异常，提示我们是否忘记解除注册了。
所以，记得在特定的地方执行解除注册操作：

    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterReceiver(receiver);
    }

#### > 发送广播
发送广播

    public void send(View view) {
        Intent intent = new Intent("android.intent.action.MY_BROADCAST");
        intent.putExtra("msg", "hello receiver.");
        sendBroadcast(intent);
    }

上面的例子只是一个接收者来接收广播，如果有多个接收者都注册了相同的广播地址，又会是什么情况呢，
能同时接收到同一条广播吗，相互之间会不会有干扰呢？这就涉及到普通广播和有序广播的概念了。

##### >> 普通广播

普通广播对于多个接收者来说是完全异步的，通常每个接收者都无需等待即可以接收到广播，
接收者相互之间不会有影响。对于这种广播，接收者无法终止广播，即无法阻止其他接收者的接收动作。

##### >> 有序广播
有序广播比较特殊，它每次只发送到优先级较高的接收者那里，然后由优先级高的接受者再传播到优先级低的接收者那里，
优先级高的接收者有能力终止这个广播。

编写三个广播接收者

    public class FirstReceiver extends BroadcastReceiver {

        private static final String TAG = "OrderedBroadcast";

        @Override
        public void onReceive(Context context, Intent intent) {
            String msg = intent.getStringExtra("msg");
            Log.i(TAG, "FirstReceiver: " + msg);

            Bundle bundle = new Bundle();
            bundle.putString("msg", msg + "@FirstReceiver");
            setResultExtras(bundle);
        }

    }

    public class SecondReceiver extends BroadcastReceiver {

        private static final String TAG = "OrderedBroadcast";

        @Override
        public void onReceive(Context context, Intent intent) {
            String msg = getResultExtras(true).getString("msg");
            Log.i(TAG, "SecondReceiver: " + msg);

            Bundle bundle = new Bundle();
            bundle.putString("msg", msg + "@SecondReceiver");
            setResultExtras(bundle);
        }

    }

    public class ThirdReceiver extends BroadcastReceiver {

        private static final String TAG = "OrderedBroadcast";

        @Override
        public void onReceive(Context context, Intent intent) {
            String msg = getResultExtras(true).getString("msg");
            Log.i(TAG, "ThirdReceiver: " + msg);
        }

    }

在FirstReceiver和SecondReceiver中最后都使用了setResultExtras方法将一个Bundle对象设置为结果集对象，
传递到下一个接收者那里，这样以来，优先级低的接收者可以用getResultExtras获取到最新的经过处理的信息集合。

注册广播接收者地址

    <receiver android:name=".FirstReceiver">
        <intent-filter android:priority="1000">
            <action android:name="android.intent.action.MY_BROADCAST"/>
            <category android:name="android.intent.category.DEFAULT" />
        </intent-filter>
    </receiver>
    <receiver android:name=".SecondReceiver">
        <intent-filter android:priority="999">
            <action android:name="android.intent.action.MY_BROADCAST"/>
            <category android:name="android.intent.category.DEFAULT" />
        </intent-filter>
    </receiver>
    <receiver android:name=".ThirdReceiver">
        <intent-filter android:priority="998">
            <action android:name="android.intent.action.MY_BROADCAST"/>
            <category android:name="android.intent.category.DEFAULT" />
        </intent-filter>
    </receiver>

现在这三个接收者的<intent-filter>多了一个android:priority属性，并且依次减小。
这个属性的范围在-1000到1000，数值越大，优先级越高。

发送有序广播

    public void send(View view) {
        Intent intent = new Intent("android.intent.action.MY_BROADCAST");
        intent.putExtra("msg", "hello receiver.");
        sendOrderedBroadcast(intent, "scott.permission.MY_BROADCAST_PERMISSION");
    }

注意，使用sendOrderedBroadcast方法发送有序广播时，需要一个权限参数，
如果为null则表示不要求接收者声明指定的权限，如果不为null，则表示接收者若要接收此广播，
需声明指定权限。这样做是从安全角度考虑的，例如系统的短信就是有序广播的形式，
一个应用可能是具有拦截垃圾短信的功能，当短信到来时它可以先接受到短信广播，
必要时终止广播传递，这样的软件就必须声明接收短信的权限。

所以我们在AndroidMainfest.xml中定义一个权限：

    <permission android:protectionLevel="normal"
                android:name="scott.permission.MY_BROADCAST_PERMISSION" />

然后声明使用了此权限：

    <uses-permission android:name="scott.permission.MY_BROADCAST_PERMISSION" />

既然是顺序传递，试着终止这种传递，是可以终止掉的

    abortBroadcast();









