# Hercules
Future Studio Hercules provisions a global Vagrant box that gives you a great development setup. No need to create an individual Vagrant box for each of your project.

Hercules is the single development box you can use for all your projects. It ships with commonly used databases and tools. It also comes with a CLI called **`hercules`**.

Hercules is disposable. If things are messed up, just throw out the old one and create a new box.


## Install
Hercules uses Vagrant. If you have Vagrant on your machine, install Hercules right away:

```
npm i -g @futurestudio/hercules
```


### Requirements
Launching your Hercules box requires you to install [Vagrant](https://www.vagrantup.com/downloads.html) and a virtualization provider, like [VirtualBox](https://www.virtualbox.org/wiki/Downloads). If you don’t have the tools installed, go ahead and download and install them (they provide easy-to-use installers).


### Install Hercules
Copy & paste the following command to your terminal and kick it off:

```
npm i -g @futurestudio/hercules
```

That’s it 🚀


## Usage (`hercules` CLI)
Hercules includes the `hercules` CLI. `hercules` is a CLI to manage your Hercules Vagrant box.

The first command you should run is `lift` to create and provision a new box.

```
# create a new box
hercules up
```

Lifting a new box takes several minutes.


## Commands
`hercules` is a CLI interface between you and the Hercules Vagrant box.

Hercules is a box that you can use for all your projects. Manage the box (start, suspend, destroy) with the following commands:

- `up`: create or start the Hercules box
- `init`: initialize the Hercules box configuration
- `status`: request the status of your Hercules box
- `sleep`: suspend your Hercules box
- `destroy`: destroy an existing Hercules box
- `restart`: restart your Hercules box
- `update`: update the Hercules box to the latest version

If you want an overview of all commands, use:

```
hercules -h
```


## License

MIT © [Future Studio](https://futurestud.io)

---

> [futurestud.io](https://futurestud.io) &nbsp;&middot;&nbsp;
> GitHub [@fs-opensource](https://github.com/fs-opensource/) &nbsp;&middot;&nbsp;
> Twitter [@futurestud_io](https://twitter.com/futurestud_io)
