# hometown
Future Studio Hometown provisions a global Vagrant box that gives you a great development setup. No need to create an individual Vagrant box for each of your project.

Hometown is the single development box you can use for all your projects. It ships with commonly used databases and tools. It also comes with a CLI called **`hercules`**.

Hometown is disposable. If things are messed up, just throw out the old one and create a new box.


## Install
Hometown uses Vagrant and VirtualBox. If you have both tools installed, skip the requirements and jump straight to **Install Hometown**.


### Requirements
Launching your Hometown box requires you to install [Vagrant](https://www.vagrantup.com/downloads.html) and a virtualization provider, like [VirtualBox](https://www.virtualbox.org/wiki/Downloads). If you don’t have the tools installed, go ahead and download and install them (they provide easy-to-use installers).


### Install Hometown
Copy & paste the following command to your terminal and kick it off:

```
npm i -g https://github.com/fs-opensource/hometown.git
```

That’s it 🚀

*Hint: we’ll update the install link to an NPM package name as soon as we publish an official version*

## Usage
Hometown includes the `hercules` CLI. `hercules` is a CLI to manage your Hometown Vagrant box.

The first command you should run is `lift` to create and provision a new box.

```
# create a new box
hercules lift
```

Lifting a new box takes some minutes.

Here’s a short overview of other commands:

```
# grab the box status
hercules status

# suspend the box (at the end of your work day)
hercules sleep

# destroy the box
hercules finish
```


## Commands
`hercules` is a CLI interface between you and the Hometown Vagrant box.

Hometown is a box that you can use for all your projects. Manage the box (start, suspend, destroy) with the following commands:

- `lift`: create or start the hometown box
- `up`: is an alias for `lift`
- `status`: request the status of your hometown box
- `sleep`: suspend your hometown box
- `finish`: destroy an existing hometown box


## License

MIT © [Future Studio](https://futurestud.io)

---

> [futurestud.io](https://futurestud.io) &nbsp;&middot;&nbsp;
> GitHub [@fs-opensource](https://github.com/fs-opensource/) &nbsp;&middot;&nbsp;
> Twitter [@futurestud_io](https://twitter.com/futurestud_io)