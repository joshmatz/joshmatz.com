---
date: 2015-02-23
linktitle: Structure for your large Angular or JavaScript app
title: Structure for your large Angular or JavaScript app
---

JavaScript frameworks don’t generally come with many opinons on how you organize your applications. You could be using a single file or many, a single module or a multitude, organized in whichever way you think is best. And when it comes to organizing a large applications, a number of developers (including us) are left scratching their heads wondering if they’re doing it right or even just how to get started. So when we started building our AngularJS application, we researched and found a few popular ways to organize your front-end code and decided on one we liked best.

Let’s consider a hypothetical app that allows users to maintain a garden and see how we might organize it.

## Functionality-based directory structure

This is perhaps the most popular way of organizing an Angular project, but not necessarily the best. The structure relies on folders of files with similar functionality. As an example:

```
/scripts
  app.js
  /config
    global-config.js
    account-config.js
    artichoke-config.js
    cucumbers-config.js
    garden-config.js
  /constants
    global-constants.js
  /controllers
    account-controller.js
    artichokes-controller.js
    garden-controller.js
    cucumbers-service.js
    navigation-controller.js
  /services
    account-service.js
    artichokes-service.js
    cucumbers-service.js
    garden-service.js
  /directives
    active-route-directive.js
    garden-drag-drop-directive.js
    artichokes-directive.js
    cucumbers-directive.js
  /templates
    account-template.html
    artichokes-item-template.html
    artichokes-list-template.html
    cucumbers-item-template.html
    cucumbers-list-template.html
    navigation-template.html
    garden-item-template.html
  /values
    global-providers.js
/tests
  ...
```

Usually this structure works out great for small applications. Unfortunately, it starts to breakdown in quite a number of ways when scaling to a larger application:

- Where would you specify modules, their dependencies, configs and run methods?
- Difficult to identify all files related to a feature: `active-route-directive.js` + `navigation-controller.js` + `navigation-template.html` + `navigation-config.js` are all necessary to render the navigation properly, but you wouldn’t know it by glancing. Which also means:
- Long-term maintenance woes. If we were to replace our garden with a terrarium, how are we to easily know what’s affected? What if we completely removed it?
- Deciding if Angular vocabulary items are really worth their own folders: values, constants, providers, services, factories, etc.

As you can see, there’s a number of issues that will need to be addressed if an application continues on with this structure, which has lead many people to the next organizational option.

## Feature-based directory structure

One way developers are addressing the problems with functionality-based organization in Angular applications is by structuring their code based on features instead. The application might look something like this:

```
/scripts
  app.js
  global-config.js
  global-constants.js
  global-providers.js
  /account
    account-config.js
    account-controller.js
    account-service.js
    account-template.html
  /artichokes
    artichokes-config.js
    artichokes-controller.js
    artichokes-item-template.html
    artichokes-service.js
    artichokes-directive.js
  /cucumbers
    cucumbers-config.js
    cucumbers-controller.js
    cucumbers-item-template.html
    cucumbers-service.js
    cucumbers-directive.js
  /garden
    garden-config.js
    garden-controller.js
    garden-item-template.html
    garden-service.js
    garden-drag-drop-directive.js
  /navigation
    active-route-directive.js
    navigation-config.js
    navigation-controller.js
    navigation-template.html
/tests
  ...
```

With this feature-based structure, we can now clearly identify everything that’s being included within our application and easily find necessary files to fix a bug in our cucumbers feature. Or, if we wanted to completely remove our garden feature, we’d be able to do so quickly and efficiently.

However, we still see room for improvement:

- Often times some features aren’t intended to be used by others. How can we make that more obvious? On the flipside, how can we make it obvious which components are for reuse?
- How can we incorporate 3rd party libraries?
- What about global configuration files that aren’t necessarily part of any particular feature?

## Combination directory structure

In the end we chose to combine the two with what we see as a pretty useful way to structure a large Angular application. It looks a little something like this:

```
/scripts
  app.js
  app.test.js
  /config
    global-config.js
    global-constants.js
    global-providers.js
  /libs
    ...
  /modules
    /account
      account-config.js
      account-service.js
    /navigation
      active-route-directive.js
      navigation-config.js
      navigation-controller.js
      navigation-template.html
    /artichokes
      artichokes-config.js
      artichokes-controller.js
      artichokes-item-template.html
      artichokes-service.js
      artichokes-directive.js
    /cucumbers
      cucumbers-config.js
      cucumbers-controller.js
      cucumbers-item-template.html
      cucumbers-service.js
      cucumbers-directive.js
    /garden
      garden-config.js
      garden-service.js
      garden-drag-drop-directive.js
  /routes
    /account
      account-controller.js
      account-template.html
    /garden
      garden-controller.js
      garden-item-template.html
    /home
      home-controller.js
      home-template.html
  /templates
    404.html
```

## Global config

As an application expands, it’ll often find its own sets of configuration necessities that span across features. In our own environment, this is where we store things like whether our app runs in html5 mode, what base API URL to use, or predefined lists that may need to be rendered in various places.

## Third party module separation

Sometimes it’s necessary to include third party integrations. Usually you’ll be using bower or npm to track these, but integration may often be required into your framework of choice. You now have a place other developers are able to quickly recognize where third party code is being integrated.

## Elevated routes for quicker identification

For the time being, web apps are still heavily influenced by the routes that users can access. These accessible pages often come with their own very specific controllers and templates that combine the various modules of an application. In our mixed approach, we’ve recognized their status and elevated them within our code organization. This makes it extremely easy when a bug is reported on /garden for a developer who wasn’t involved in the feature to isolate the files and debug from there.

## What do you think?

The examples above are very rudimentary, but with this mixed approach we think we’re getting the best of both the feature and functional worlds.

What do you think? Curious why I did something? Ask away, I'd love to answer.

_This article originally appeared on [SourceClear's blog](https://blog.srcclr.com/structure-for-your-large-angular-or-javascript-app/) and is preserved here for historical reference._
