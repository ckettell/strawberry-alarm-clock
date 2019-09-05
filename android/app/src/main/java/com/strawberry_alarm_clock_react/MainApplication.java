package com.strawberry_alarm_clock_react;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;

import com.emekalites.react.alarm.notification.ANPackage;

import com.ocetnik.timer.BackgroundTimerPackage;
import com.facebook.react.ReactNativeHost;
 import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.List;
import java.util.Arrays;

public class MainApplication extends Application implements ReactApplication {



  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
    @Override
protected List<ReactPackage> getPackages() {
return Arrays.<ReactPackage>asList(
  new MainReactPackage(),
          new ANPackage(),
);
}
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
  @Override
  public void onCreate() {
    super.onCreate();

    String id = "strawberry";					// The id of the channel.
 CharSequence name = "my_channel_name";			// The user-visible name of the channel.
 String description = "my_channel_description";	// The user-visible description of the channel.

 if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
   NotificationChannel mChannel = new NotificationChannel(id, name, NotificationManager.IMPORTANCE_HIGH);

   // Configure the notification channel.
   mChannel.setDescription(description);

   mChannel.enableLights(true);
   // Sets the notification light color for notifications posted to this
   // channel, if the device supports this feature.
   mChannel.setLightColor(Color.RED);

   mChannel.enableVibration(true);
   mChannel.setVibrationPattern(new long[]{100, 200, 300, 400, 500, 400, 300, 200, 400});

   NotificationManager mNotificationManager = (NotificationManager) this.getSystemService(Context.NOTIFICATION_SERVICE);
 mNotificationManager.createNotificationChannel(mChannel);
 }
}



}
