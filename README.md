# LockIt Web

## Bootstrapping
To begin, let's install the latest version of the Ionic CLI.
```
npm install -g ionic@latest
```

From here, the global command ionic will allow for the management of the React project with Ionic and any other dependencies. To run the project, execute the following command:
```
ionic serve
```

#### Web

The server will be listening at `localhost:8100`. Just access with your favorite browser.

#### Mobile

To run the application, you must first download the **Ionic Devapp** for your mobile OS (you can find it at the [PlayStore](https://play.google.com/store/apps/details?id=io.ionic.devapp) or at the [AppStore](https://apps.apple.com/us/app/ionic-devapp/id1233447133)). Once you got the app, be sure to connect both your mobile and the server on the same WiFi network. Then, open the **Ionic Devapp** and set the server address manually in the menu:
* Address: 192.168.1.118
* Port: 8100

Finally, just find your application in the list, and enjoy!

#### Common Issues
Listen uses inotify by default on Linux to monitor directories for changes. It's not uncommon to encounter a system limit on the number of files you can monitor. If while running the server you get the following error:
```
Error: ENOSPC: System limit for number of file watchers reached, watch './public'
```
You must run the following commands. If you are running Debian, RedHat, or another similar Linux distribution:
```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
If you are running ArchLinux:
```
echo fs.inotify.max_user_watches=524288 | sudo tee /etc/sysctl.d/40-max-user-watches.conf && sudo sysctl --system
```