# LockIt Web

## Bootstrapping
To begin, let's install the latest version of the Ionic CLI.
```
npm install -g ionic@latest
```

From here, the global command ionic will allow for the management of the React project with Ionic and any other dependencies. To run the project, execut the following command:
```
ionic serve
```

The server will be listening at port `8100`.

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