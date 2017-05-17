## Service的生命周期
Service生命周期可以从两种启动Service的模式开始讲起，
分别是context.startService()和context.bindService()。

#### > context.startService()
当我们首次使用startService启动一个服务时，系统会实例化一个Service实例，
依次调用其onCreate和onStartCommand方法，然后进入运行状态，
此后，如果再使用startService启动服务时，不再创建新的服务对象，
系统会自动找到刚才创建的Service实例，调用其onStart方法；
如果我们想要停掉一个服务，可使用stopService方法，此时onDestroy方法会被调用，
需要注意的是，不管前面使用了多个次startService，只需一次stopService，即可停掉服务。

#### > context.bindService()
在这种模式下，当调用者首次使用bindService绑定一个服务时，系统会实例化一个Service实例，
并依次调用其onCreate方法和onBind方法，然后调用者就可以和服务进行交互了，
此后，如果再次使用bindService绑定服务，系统不会创建新的Service实例，也不会再调用onBind方法；
如果我们需要解除与这个服务的绑定，可使用unbindService方法，此时onUnbind方法和onDestroy方法会被调用。

#### > 两种方式的不同之处
startService模式下调用者与服务无必然联系，即使调用者结束了自己的生命周期，
只要没有使用stopService方法停止这个服务，服务仍会运行；
通常情况下，bindService模式下服务是与调用者生死与共的，在绑定结束之后，一旦调用者被销毁，
服务也就立即终止，就像江湖上的一句话：不求同生，但愿同死。

值得一提的是，以前我们在使用startService启动服务时都是习惯重写onStart方法，
在Android2.0时系统引进了onStartCommand方法取代onStart方法，
为了兼容以前的程序，在onStartCommand方法中其实调用了onStart方法，不过我们最好是重写onStartCommand方法。

## startService实例
创建MyService类

    public class MyService extends Service {

        private static final String TAG = "MyService";

        @Override
        public void onCreate() {
            super.onCreate();
            Log.i(TAG, "onCreate called.");
        }

        @Override
        public int onStartCommand(Intent intent, int flags, int startId) {
            Log.i(TAG, "onStartCommand called.");
            return super.onStartCommand(intent, flags, startId);
        }

        @Override
        public void onStart(Intent intent, int startId) {
            super.onStart(intent, startId);
            Log.i(TAG, "onStart called.");
        }

        @Override
        public void onDestroy() {
            super.onDestroy();
            Log.i(TAG, "onDestroy called.");
        }
    }

在AndroidManifest.xml配置服务

    <service android:name=".MyService">
        <intent-filter>
             <action android:name="android.intent.action.MyService" />
             <category android:name="android.intent.category.DEFAULT" />
        </intent-filter>
    </service>

在MainActivity中调用启动服务和停止服务

    /**
     * 启动服务
     * @param view
     */
    public void start(View view) {
        Intent intent = new Intent(this, MyService.class);
        startService(intent);
    }

    /**
     * 停止服务
     * @param view
     */
    public void stop(View view) {
        Intent intent = new Intent(this, MyService.class);
        stopService(intent);
    }

日志如下

开启服务：

    onCreate called.
    onStartCommand called.
    onStart called. //此方法现在已不使用

再次点击开启服务：

    onStartCommand called.
    onStart called. //此方法现在已不使用

停止服务：

    onDestory called.

## bindService实例
在MainActivity添加代码

    private ServiceConnection conn = new ServiceConnection() {

        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            //connected
            Log.i(TAG, "onServiceConnected called.");
        }

        /**
         *  Called when a connection to the Service has been lost.
         *  This typically happens when the process hosting the service has crashed or been killed.
         *  This does not remove the ServiceConnection itself.
         *  this binding to the service will remain active,
         *  and you will receive a call to onServiceConnected when the Service is next running.
         */
        @Override
        public void onServiceDisconnected(ComponentName name) {
        }
    };

    /**
     * 绑定服务
     * @param view
     */
    public void bind(View view) {
        Intent intent = new Intent(this, MyService.class);
        bindService(intent, conn, Context.BIND_AUTO_CREATE);
    }

    /**
     * 解除绑定
     * @param view
     */
    public void unbind(View view) {
        unbindService(conn);
    }

修改MyService文件

    public class MyService extends Service {

        private static final String TAG = "MyService";

        @Override
        public void onCreate() {
            super.onCreate();
            Log.i(TAG, "onCreate called.");
        }

        @Override
        public IBinder onBind(Intent intent) {
            Log.i(TAG, "onBind called.");
            return new Binder(){}; // 返回Binder对象
        }

        @Override
        public boolean onUnbind(Intent intent) {
            Log.i(TAG, "onUnbind called.");
            return super.onUnbind(intent);
        }

        @Override
        public void onDestroy() {
            super.onDestroy();
            Log.i(TAG, "onDestroy called.");
        }
    }

日志如下

绑定服务：

    onCreate called.
    onBind called.
    onServiceConnected called.

再次点击绑定服务，任何方法都不调用

解除绑定服务：

    onUnbind called.
    onDestroy called.

另一方面，当我们退出MainActivity时，服务也会随之而结束，
从这一点上看，MyService可以说是誓死追随着MainActivity。
需要注意的是，在连接中断状态再去做解除绑定操作会引起一个异常，
在MainActivity销毁之前没有进行解除绑定也会导致后台出现异常信息，

## 进程内与服务通信
在MyService中添加内部类

    public class MyService extends Service {

        private static final String TAG = "MyService";

        @Override
        public IBinder onBind(Intent intent) {
            Log.i(TAG, "onBind called.");
            return new MyBinder();
        }

        /**
         * 绑定对象
         * @author user
         *
         */
        public class MyBinder extends Binder {

            /**
             * 问候
             * @param name
             */
            public void greet(String name) {
                Log.i(TAG, "hello, " + name);
            }
        }
    }

在MainActivity中获取该对象

    public class MainActivity extends Activity {

        /**
         * 绑定对象实例
         */
        private MyService.MyBinder binder;

        @Override
        public void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.main);
        }

        private ServiceConnection conn = new ServiceConnection() {

            @Override
            public void onServiceConnected(ComponentName name, IBinder service) {
                binder = (MyService.MyBinder) service;  //获取其实例
                binder.greet("scott");                  //调用其方法
            }

            @Override
            public void onServiceDisconnected(ComponentName name) {
            }
        };

        /**
         * 绑定服务
         * @param view
         */
        public void bind(View view) {
            Intent intent = new Intent(this, MyService.class);
            bindService(intent, conn, Context.BIND_AUTO_CREATE);
        }

        /**
         * 解除绑定
         * @param view
         */
        public void unbind(View view) {
            unbindService(conn);
        }
    }

需要注意的是，与服务绑定是一个异步的过程，也就是说，在这一刻我们绑定服务，
下一刻我们去操作binder对象，也许它还为null，这就容易引起空指针异常，
正确的做法是把这些操作放到绑定成功之后，确保万无一失。

## 进程间通信(AIDL)

#### > 服务端

创建IPerson.aidl文件

    package com.scott.aidl;
    interface IPerson {
        String greet(String someone);
    }

创建AIDLService文件

    package com.scott.server;
    public class AIDLService extends Service {

        private static final String TAG = "AIDLService";

        IPerson.Stub stub = new IPerson.Stub() {
            @Override
            public String greet(String someone) throws RemoteException {
                Log.i(TAG, "greet() called");
                return "hello, " + someone;
            }
        };

        @Override
        public IBinder onBind(Intent intent) {
            Log.i(TAG, "onBind() called");
            return stub;
        }

        @Override
        public boolean onUnbind(Intent intent) {
            Log.i(TAG, "onUnbind() called");
            return true;
        }

        @Override
        public void onDestroy() {
            super.onDestroy();
            Log.i(TAG, "onDestroy() called");
        }
    }

在AndroidManifest.xml配置服务

    <service android:name=".AIDLService">
        <intent-filter>
            <action android:name="android.intent.action.AIDLService" />
            <category android:name="android.intent.category.DEFAULT" />
        </intent-filter>
    </service>

#### > 客户端
创建IPerson.aidl文件，包名与服务端一致。

在MainActivity中创建ServiceConnection对象。

    public class MainActivity extends Activity {

        private Button bindBtn;
        private Button greetBtn;
        private Button unbindBtn;

        private IPerson person;
        private ServiceConnection conn = new ServiceConnection() {

            @Override
            public void onServiceConnected(ComponentName name, IBinder service) {
                Log.i("ServiceConnection", "onServiceConnected() called");
                person = IPerson.Stub.asInterface(service);
            }

            @Override
            public void onServiceDisconnected(ComponentName name) {
                //This is called when the connection with the service has been unexpectedly disconnected,
                //that is, its process crashed. Because it is running in our same process, we should never see this happen.
                Log.i("ServiceConnection", "onServiceDisconnected() called");
            }
        };

        @Override
        public void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.main);

            bindBtn = (Button) findViewById(R.id.bindBtn);
            bindBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent("android.intent.action.AIDLService");
                    bindService(intent, conn, Context.BIND_AUTO_CREATE);

                    bindBtn.setEnabled(false);
                    greetBtn.setEnabled(true);
                    unbindBtn.setEnabled(true);
                }
            });

            greetBtn = (Button) findViewById(R.id.greetBtn);
            greetBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    try {
                        String retVal = person.greet("scott");
                        Toast.makeText(MainActivity.this, retVal, Toast.LENGTH_SHORT).show();
                    } catch (RemoteException e) {
                        Toast.makeText(MainActivity.this, "error", Toast.LENGTH_SHORT).show();
                    }
                }
            });

            unbindBtn = (Button) findViewById(R.id.unbindBtn);
            unbindBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    unbindService(conn);

                    bindBtn.setEnabled(true);
                    greetBtn.setEnabled(false);
                    unbindBtn.setEnabled(false);
                }
            });
        }
    }

## 进程间通信之复杂类型传递

首先了解一下AIDL对Java类型的支持

    1.AIDL支持Java原始数据类型。
    2.AIDL支持String和CharSequence。
    3.AIDL支持传递其他AIDL接口，但你引用的每个AIDL接口都需要一个import语句，即使位于同一个包中。
    4.AIDL支持传递实现了Android.os.Parcelable接口的复杂类型，同样在引用这些类型时也需要import语句。
    5.AIDL支持java.util.List和java.util.Map，但是有一些限制。
    6.非原始类型中，除了String和CharSequence以外，其余均需要一个方向指示符。
    方向指示符包括in、out、和inout。
    in表示由客户端设置，out表示由服务端设置，inout表示客户端和服务端都设置了该值。

#### > 服务端

创建Person类文件

    package com.scott.aidl;
    public class Person implements Parcelable {

        private String name;
        private int sex;

    }

在同一包下建立一个与包含复杂类型的Person.java文件匹配的Person.aidl文件

    package com.scott.aidl;
    parcelable Person;

接下来，我们需要创建一个IGreetService.aidl文件，以接收类型为Person的输入参数，
以便客户端可以将Person传递给服务。

    package com.scott.aidl;
    import com.scott.aidl.Person;

    interface IGreetService {
        String greet(in Person person);
    }

注意，我们需要在参数上加入方向指示符in，代表参数由客户端设置，
我们还需要为Person提供一个import语句(虽然说在同一个包下)。

创建AIDLService文件

    public class AIDLService extends Service {

        private static final String TAG = "AIDLService";

        IGreetService.Stub stub = new IGreetService.Stub() {
            @Override
            public String greet(Person person) throws RemoteException {
                Log.i(TAG, "greet(Person person) called");

                String greeting = "hello, " + person.getName();
                switch (person.getSex()) {
                    case 0:
                        greeting = greeting + ", you're handsome.";
                        break;
                    case 1:
                        greeting = greeting + ", you're beautiful.";
                        break;
                }
                return greeting;
            }
        };

        @Override
        public IBinder onBind(Intent intent) {
            Log.i(TAG, "onBind() called");
            return stub;
        }

        @Override
        public boolean onUnbind(Intent intent) {
            Log.i(TAG, "onUnbind() called");
            return true;
        }

        @Override
        public void onDestroy() {
            super.onDestroy();
            Log.i(TAG, "onDestroy() called");
        }
    }

在AndroidManifest.xml中配置该服务

    <service android:name=".AIDLService">
        <intent-filter>
            <action android:name="android.intent.action.AIDLService" />
            <category android:name="android.intent.category.DEFAULT" />
        </intent-filter>
    </service>

#### > 客户端
我们需要把服务端的Person.java、Person.aidl和IGreetService.aidl拷到对应的包下。

在MainActivity中修改

    public class MainActivity extends Activity {

        private Button bindBtn;
        private Button greetBtn;
        private Button unbindBtn;

        private IGreetService greetService;
        private ServiceConnection conn = new ServiceConnection() {

            @Override
            public void onServiceConnected(ComponentName name, IBinder service) {
                Log.i("ServiceConnection", "onServiceConnected() called");
                greetService = IGreetService.Stub.asInterface(service);
            }

            @Override
            public void onServiceDisconnected(ComponentName name) {
                //This is called when the connection with the service has been unexpectedly disconnected,
                //that is, its process crashed. Because it is running in our same process, we should never see this happen.
                Log.i("ServiceConnection", "onServiceDisconnected() called");
            }
        };

        @Override
        public void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.main);

            bindBtn = (Button) findViewById(R.id.bindBtn);
            bindBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent("android.intent.action.AIDLService");
                    bindService(intent, conn, Context.BIND_AUTO_CREATE);

                    bindBtn.setEnabled(false);
                    greetBtn.setEnabled(true);
                    unbindBtn.setEnabled(true);
                }
            });

            greetBtn = (Button) findViewById(R.id.greetBtn);
            greetBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    try {
                        Person person = new Person();
                        person.setName("scott");
                        person.setSex(0);
                        String retVal = greetService.greet(person);
                        Toast.makeText(MainActivity.this, retVal, Toast.LENGTH_SHORT).show();
                    } catch (RemoteException e) {
                        Toast.makeText(MainActivity.this, "error", Toast.LENGTH_SHORT).show();
                    }
                }
            });

            unbindBtn = (Button) findViewById(R.id.unbindBtn);
            unbindBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    unbindService(conn);

                    bindBtn.setEnabled(true);
                    greetBtn.setEnabled(false);
                    unbindBtn.setEnabled(false);
                }
            });
        }
    }

