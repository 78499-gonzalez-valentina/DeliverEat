# Angular coding style guide

Looking for an opinionated guide to Angular syntax, conventions, and application structure?
Step right in.
This style guide presents preferred conventions and, as importantly, explains why.

<a id="toc"></a>

## Style vocabulary

Each guideline describes either a good or bad practice, and all have a consistent presentation.

The wording of each guideline indicates how strong the recommendation is.

<div class="s-rule do">

**Do** is one that should always be followed.
*Always* might be a bit too strong of a word.
Guidelines that literally should always be followed are extremely rare.
On the other hand, you need a really unusual case for breaking a *Do* guideline.

</div>

<div class="s-rule consider">

**Consider** guidelines should generally be followed.
If you fully understand the meaning behind the guideline and have a good reason to deviate, then do so.
Aim to be consistent.

</div>

<div class="s-rule avoid">

**Avoid** indicates something you should almost never do.
Code examples to *avoid* have an unmistakable red header.

</div>

<div class="s-why">

**Why**? <br />
Gives reasons for following the previous recommendations.

</div>

## File structure conventions

Some code examples display a file that has one or more similarly named companion files.
For example, `hero.component.ts` and `hero.component.html`.

The guideline uses the shortcut `hero.component.ts|html|css|spec` to represent those various files.
Using this shortcut makes this guide's file structures easier to read and more terse.

<a id="single-responsibility"></a>

## Single responsibility

Apply the [*single responsibility principle (SRP)*](https://wikipedia.org/wiki/Single_responsibility_principle) to all components, services, and other symbols.
This helps make the application cleaner, easier to read and maintain, and more testable.

<a id="01-01"></a>

### Rule of One

#### Style 01-01

<div class="s-rule do">

**Do** define one thing, such as a service or component, per file.

</div>

<div class="s-rule consider">

**Consider** limiting files to 400 lines of code.

</div>

<div class="s-why">

**Why**? <br />
One component per file makes it far easier to read, maintain, and avoid collisions with teams in source control.

</div>

<div class="s-why">

**Why**? <br />
One component per file avoids hidden bugs that often arise when combining components in a file where they may share variables, create unwanted closures, or unwanted coupling with dependencies.

</div>

<div class="s-why-last">

**Why**? <br />
A single component can be the default export for its file which facilitates lazy loading with the router.

</div>

The key is to make the code more reusable, easier to read, and less mistake-prone.

It is a better practice to redistribute the component and its
supporting classes into their own, dedicated files.

As the application grows, this rule becomes even more important.

[Back to top](#toc)

<a id="01-02"></a>

### Small functions

#### Style 01-02

<div class="s-rule do">

**Do** define small functions

</div>

<div class="s-rule consider">

**Consider** limiting to no more than 75 lines.

</div>

<div class="s-why">

**Why**? <br />
Small functions are easier to test, especially when they do one thing and serve one purpose.

</div>

<div class="s-why">

**Why**? <br />
Small functions promote reuse.

</div>

<div class="s-why">

**Why**? <br />
Small functions are easier to read.

</div>

<div class="s-why">

**Why**? <br />
Small functions are easier to maintain.

</div>

<div class="s-why-last">

**Why**? <br />
Small functions help avoid hidden bugs that come with large functions that share variables with external scope, create unwanted closures, or unwanted coupling with dependencies.

</div>

[Back to top](#toc)

## Naming

Naming conventions are hugely important to maintainability and readability.
This guide recommends naming conventions for the file name and the symbol name.

<a id="02-01"></a>

### General Naming Guidelines

#### Style 02-01

<div class="s-rule do">

**Do** use consistent names for all symbols.

</div>

<div class="s-rule do">

**Do** follow a pattern that describes the symbol's feature then its type.
The recommended pattern is `feature.type.ts`.

</div>

<div class="s-why">

**Why**? <br />
Naming conventions help provide a consistent way to find content at a glance.
Consistency within the project is vital.
Consistency with a team is important.
Consistency across a company provides tremendous efficiency.

</div>

<div class="s-why">

**Why**? <br />
The naming conventions should help find desired code faster and make it easier to understand.

</div>

<div class="s-why-last">

**Why**? <br />
Names of folders and files should clearly convey their intent.
For example, `app/heroes/hero-list.component.ts` may contain a component that manages a list of heroes.

</div>

[Back to top](#toc)

<a id="02-02"></a>

### Separate file names with dots and dashes

#### Style 02-02

<div class="s-rule do">

**Do** use dashes to separate words in the descriptive name.

</div>

<div class="s-rule do">

**Do** use dots to separate the descriptive name from the type.

</div>

<div class="s-rule do">

**Do** use consistent type names for all components following a pattern that describes the component's feature then its type.
A recommended pattern is `feature.type.ts`.

</div>

<div class="s-rule do">

**Do** use conventional type names including `.service`, `.component`, `.pipe`, `.module`, and `.directive`.
Invent additional type names if you must but take care not to create too many.

</div>

<div class="s-why">

**Why**? <br />
Type names provide a consistent way to quickly identify what is in the file.

</div>

<div class="s-why">

**Why**? <br />
Type names make it easy to find a specific file type using an editor or IDE's fuzzy search techniques.

</div>

<div class="s-why">

**Why**? <br />
Unabbreviated type names such as `.service` are descriptive and unambiguous.
Abbreviations such as `.srv`, `.svc`, and `.serv` can be confusing.

</div>

<div class="s-why-last">

**Why**? <br />
Type names provide pattern matching for any automated tasks.

</div>

[Back to top](#toc)

<a id="02-03"></a>

### Symbols and file names

#### Style 02-03

<div class="s-rule do">

**Do** use consistent names for all assets named after what they represent.

</div>

<div class="s-rule do">

**Do** use upper camel case for class names.

</div>

<div class="s-rule do">

**Do** match the name of the symbol to the name of the file.

</div>

<div class="s-rule do">

**Do** append the symbol name with the conventional suffix \(such as `Component`, `Directive`, `Module`, `Pipe`, or `Service`\) for a thing of that type.

</div>

<div class="s-rule do">

**Do** give the filename the conventional suffix \(such as `.component.ts`, `.directive.ts`, `.module.ts`, `.pipe.ts`, or `.service.ts`\) for a file of that type.

</div>

<div class="s-why">

**Why**? <br />
Consistent conventions make it easy to quickly identify and reference assets of different types.

</div>

| Symbol name                                                                                                                                                                          | File name |
|:---                                                                                                                                                                                  |:---       |
| &commat;Component({ &hellip; }) &NewLine;export class AppComponent { }                             | app.component.ts |
| &commat;Component({ &hellip; }) &NewLine;export class HeroesComponent { }                          | heroes.component.ts |
| &commat;Component({ &hellip; }) &NewLine;export class HeroListComponent { }                        | hero-list.component.ts |
| &commat;Component({ &hellip; }) &NewLine;export class HeroDetailComponent { }                      | hero-detail.component.ts |
| &commat;Directive({ &hellip; }) &NewLine;export class ValidationDirective { }                      | validation.directive.ts |
| &commat;NgModule({ &hellip; }) &NewLine;export class AppModule                                     | app.module.ts |
| &commat;Pipe({ name: 'initCaps' }) &NewLine;export class InitCapsPipe implements PipeTransform { } | init-caps.pipe.ts |
| &commat;Injectable() &NewLine;export class UserProfileService { }                                  | user-profile.service.ts |

[Back to top](#toc)

<a id="02-04"></a>

### Service names

#### Style 02-04

<div class="s-rule do">

**Do** use consistent names for all services named after their feature.

</div>

<div class="s-rule do">

**Do** suffix a service class name with `Service`.
For example, something that gets data or heroes should be called a `DataService` or a `HeroService`.

A few terms are unambiguously services.
They typically indicate agency by ending in "-er".
You may prefer to name a service that logs messages `Logger` rather than `LoggerService`.
Decide if this exception is agreeable in your project.
As always, strive for consistency.

</div>

<div class="s-why">

**Why**? <br />
Provides a consistent way to quickly identify and reference services.

</div>

<div class="s-why">

**Why**? <br />
Clear service names such as `Logger` do not require a suffix.

</div>

<div class="s-why-last">

**Why**? <br />
Service names such as `Credit` are nouns and require a suffix and should be named with a suffix when it is not obvious if it is a service or something else.

</div>

| Symbol name                                                                                                                                      | File name |
|:---                                                                                                                                              |:---       |
| &commat;Injectable() &NewLine;export class HeroDataService { } | hero-data.service.ts |
| &commat;Injectable() &NewLine;export class CreditService { }   | credit.service.ts    |
| &commat;Injectable() &NewLine;export class Logger { }          | logger.service.ts    |

[Back to top](#toc)

<a id="02-05"></a>

### Bootstrapping

#### Style 02-05

<div class="s-rule do">

**Do** put bootstrapping and platform logic for the application in a file named `main.ts`.

</div>

<div class="s-rule do">

**Do** include error handling in the bootstrapping logic.

</div>

<div class="s-rule avoid">

**Avoid** putting application logic in `main.ts`.
Instead, consider placing it in a component or service.

</div>

<div class="s-why">

**Why**? <br />
Follows a consistent convention for the startup logic of an app.

</div>

<div class="s-why-last">

**Why**? <br />
Follows a familiar convention from other technology platforms.

</div>

[Back to top](#toc)

<a id="05-02"></a>

### Component selectors

#### Style 05-02

<div class="s-rule do">

**Do** use *dashed-case* or *kebab-case* for naming the element selectors of components.

</div>

<div class="s-why-last">

**Why**? <br />
Keeps the element names consistent with the specification for [Custom Elements](https://www.w3.org/TR/custom-elements).

</div>

[Back to top](#toc)

<a id="02-07"></a>

### Angular `NgModule` names

#### Style 02-12

<div class="s-rule do">

**Do** append the symbol name with the suffix `Module`.

</div>

<div class="s-rule do">

**Do** give the file name the `.module.ts` extension.

</div>

<div class="s-rule do">

**Do** name the module after the feature and folder it resides in.

</div>

<div class="s-why">

**Why**? <br />
Provides a consistent way to quickly identify and reference modules.

</div>

<div class="s-why">

**Why**? <br />
Upper camel case is conventional for identifying objects that can be instantiated using a constructor.

</div>

<div class="s-why-last">

**Why**? <br />
Easily identifies the module as the root of the same named feature.

</div>

<div class="s-rule do">

**Do** suffix a `RoutingModule` class name with `RoutingModule`.

</div>

<div class="s-rule do">

**Do** end the filename of a `RoutingModule` with `-routing.module.ts`.

</div>

<div class="s-why-last">

**Why**? <br />
A `RoutingModule` is a module dedicated exclusively to configuring the Angular router.
A consistent class and file name convention make these modules easy to spot and verify.

</div>

| Symbol name                                                                                                                                                    | File name |
|:---                                                                                                                                                            |:---       |
| &commat;NgModule({ &hellip; }) &NewLine;export class AppModule { }           | app.module.ts            |
| &commat;NgModule({ &hellip; }) &NewLine;export class HeroesModule { }        | heroes.module.ts         |
| &commat;NgModule({ &hellip; }) &NewLine;export class VillainsModule { }      | villains.module.ts       |
| &commat;NgModule({ &hellip; }) &NewLine;export class AppRoutingModule { }    | app-routing.module.ts    |
| &commat;NgModule({ &hellip; }) &NewLine;export class HeroesRoutingModule { } | heroes-routing.module.ts |

[Back to top](#toc)

## Application structure and NgModules

Have a near-term view of implementation and a long-term vision.
Start small but keep in mind where the application is heading.

All of the application's code goes in a folder named `src`.
All feature areas are in their own folder, with their own NgModule.

All content is one asset per file.
Each component, service, and pipe is in its own file.
All third party vendor scripts are stored in another folder and not in the `src` folder.
You didn't write them and you don't want them cluttering `src`.
Use the naming conventions for files in this guide.

[Back to top](#toc)

<a id="04-01"></a>

### `LIFT`

#### Style 04-01

<div class="s-rule do">

**Do** structure the application such that you can **L**ocate code quickly, **I**dentify the code at a glance, keep the **F**lattest structure you can, and **T**ry to be DRY.

</div>

<div class="s-rule do">

**Do** define the structure to follow these four basic guidelines, listed in order of importance.

</div>

<div class="s-why-last">

**Why**? <br />
LIFT provides a consistent structure that scales well, is modular, and makes it easier to increase developer efficiency by finding code quickly.
To confirm your intuition about a particular structure, ask:
*Can I quickly open and start work in all of the related files for this feature*?

</div>

[Back to top](#toc)

<a id="04-02"></a>

### Locate

#### Style 04-02

<div class="s-rule do">

**Do** make locating code intuitive and fast.

</div>

<div class="s-why-last">

**Why**? <br />
To work efficiently you must be able to find files quickly, especially when you do not know \(or do not remember\) the file *names*.
Keeping related files near each other in an intuitive location saves time.
A descriptive folder structure makes a world of difference to you and the people who come after you.

</div>

[Back to top](#toc)

<a id="04-03"></a>

### Identify

#### Style 04-03

<div class="s-rule do">

**Do** name the file such that you instantly know what it contains and represents.

</div>

<div class="s-rule do">

**Do** be descriptive with file names and keep the contents of the file to exactly one component.

</div>

<div class="s-rule avoid">

**Avoid** files with multiple components, multiple services, or a mixture.

</div>

<div class="s-why-last">

**Why**? <br />
Spend less time hunting and pecking for code, and become more efficient.
Longer file names are far better than *short-but-obscure* abbreviated names.

</div>

<div class="alert is-helpful">

It may be advantageous to deviate from the *one-thing-per-file* rule when you have a set of small, closely-related features that are better discovered and understood in a single file than as multiple files.
Be wary of this loophole.

</div>

[Back to top](#toc)

<a id="04-04"></a>

### Flat

#### Style 04-04

<div class="s-rule do">

**Do** keep a flat folder structure as long as possible.

</div>

<div class="s-rule consider">

**Consider** creating sub-folders when a folder reaches seven or more files.

</div>

<div class="s-rule consider">

**Consider** configuring the IDE to hide distracting, irrelevant files such as generated `.js` and `.js.map` files.

</div>

<div class="s-why-last">

**Why**? <br />
No one wants to search for a file through seven levels of folders.
A flat structure is easy to scan.

On the other hand, [psychologists believe](https://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two) that humans start to struggle when the number of adjacent interesting things exceeds nine.
So when a folder has ten or more files, it may be time to create subfolders.

Base your decision on your comfort level.
Use a flatter structure until there is an obvious value to creating a new folder.

</div>

[Back to top](#toc)

<a id="04-05"></a>

### *T-DRY* \(Try to be *DRY*\)

#### Style 04-05

<div class="s-rule do">

**Do** be DRY \(Don't Repeat Yourself\).

</div>

<div class="s-rule avoid">

**Avoid** being so DRY that you sacrifice readability.

</div>

<div class="s-why-last">

**Why**? <br />
Being DRY is important, but not crucial if it sacrifices the other elements of LIFT.
That's why it's called *T-DRY*.
For example, it's redundant to name a template `hero-view.component.html` because with the `.html` extension, it is obviously a view.
But if something is not obvious or departs from a convention, then spell it out.

</div>

[Back to top](#toc)

<a id="04-06"></a>

### Overall structural guidelines

#### Style 04-06

<div class="s-rule do">

**Do** start small but keep in mind where the application is heading down the road.

</div>

<div class="s-rule do">

**Do** have a near term view of implementation and a long term vision.

</div>

<div class="s-rule do">

**Do** put all of the application's code in a folder named `src`.

</div>

<div class="s-rule consider">

**Consider** creating a folder for a component when it has multiple accompanying files \(`.ts`, `.html`, `.css`, and `.spec`\).

</div>

<div class="s-why">

**Why**? <br />
Helps keep the application structure small and easy to maintain in the early stages, while being easy to evolve as the application grows.

</div>

<div class="s-why-last">

**Why**? <br />
Components often have four files \(for example, `*.html`, `*.css`, `*.ts`, and `*.spec.ts`\) and can clutter a folder quickly.

</div>

<a id="file-tree"></a>

Here is a compliant folder and file structure:
```
<project root>
├── src
│   ├── app
│   │   ├── core
│   │   │   ├── exception.service.ts|spec.ts
│   │   │   ├── user-profile.service.ts|spec.ts
│   │   │
│   │   ├── heroes
│   │   │   ├── hero
│   │   │   │   ├── hero.component.ts|html|css|spec.ts
│   │   │   │
│   │   │   ├── hero-list
│   │   │   │   ├── hero-list.component.ts|html|css|spec.ts
│   │   │   │   
│   │   │   ├── shared
│   │   │   │   ├── hero-button.component.ts|html|css|spec.ts
│   │   │   │   ├── hero.model.ts
│   │   │   │   ├── hero.service.ts|spec.ts
│   │   │   │ 
│   │   │   ├── heroes.component.ts|html|css|spec.ts
│   │   │   ├── heroes.module.ts
│   │   │   ├── heroes-routing.module.ts
│   │   │
│   │   ├── shared
│   │   │   ├── shared.module.ts
│   │   │   ├── init-caps.pipe.ts|spec.ts
│   │   │   ├── filter-text.component.ts|spec.ts
│   │   │   ├── filter-text.service.ts|spec.ts
│   │   │
│   │   ├── app.component.ts|html|css|spec.ts
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │ 
│   ├── app
│   │   ├── main.ts
│   │   ├── index.html
│   │   ├── …
│   
├── node_modules/…
├── …

```

While components in dedicated folders are widely preferred, another option for small applications is to keep components flat \(not in a dedicated folder\).
This adds up to four files to the existing folder, but also reduces the folder nesting.
Whatever you choose, be consistent.

[Back to top](#toc)

<a id="04-07"></a>

### *Folders-by-feature* structure

#### Style 04-07

<div class="s-rule do">

**Do** create folders named for the feature area they represent.

</div>

<div class="s-why">

**Why**? <br />
A developer can locate the code and identify what each file represents at a glance.
The structure is as flat as it can be and there are no repetitive or redundant names.

</div>

<div class="s-why">

**Why**? <br />
The LIFT guidelines are all covered.

</div>

<div class="s-why">

**Why**? <br />
Helps reduce the application from becoming cluttered through organizing the content and keeping them aligned with the LIFT guidelines.

</div>

<div class="s-why">

**Why**? <br />
When there are a lot of files, for example 10+, locating them is easier with a consistent folder structure and more difficult in a flat structure.

</div>

<div class="s-rule do">

**Do** create an NgModule for each feature area.

</div>

<div class="s-why">

**Why**? <br />
NgModules make it easy to lazy load routable features.

</div>

<div class="s-why-last">

**Why**? <br />
NgModules make it easier to isolate, test, and reuse features.

</div>

<div>

For more information, refer to [this folder and file structure example](#file-tree).

</div>

[Back to top](#toc)

<a id="04-08"></a>

### App *root module*

#### Style 04-08

<div class="s-rule do">

**Do** create an NgModule in the application's root folder, for example, in `/src/app`.

</div>

<div class="s-why">

**Why**? <br />
Every application requires at least one root NgModule.

</div>

<div class="s-rule consider">

**Consider** naming the root module `app.module.ts`.

</div>

<div class="s-why-last">

**Why**? <br />
Makes it easier to locate and identify the root module.

</div>

[Back to top](#toc)

<a id="04-09"></a>

### Feature modules

#### Style 04-09

<div class="s-rule do">

**Do** create an NgModule for all distinct features in an application; for example, a `Heroes` feature.

</div>

<div class="s-rule do">

**Do** place the feature module in the same named folder as the feature area; for example, in `app/heroes`.

</div>

<div class="s-rule do">

**Do** name the feature module file reflecting the name of the feature area and folder; for example, `app/heroes/heroes.module.ts`.

</div>

<div class="s-rule do">

**Do** name the feature module symbol reflecting the name of the feature area, folder, and file; for example, `app/heroes/heroes.module.ts` defines `HeroesModule`.

</div>

<div class="s-why">

**Why**? <br />
A feature module can expose or hide its implementation from other modules.

</div>

<div class="s-why">

**Why**? <br />
A feature module identifies distinct sets of related components that comprise the feature area.

</div>

<div class="s-why">

**Why**? <br />
A feature module can easily be routed to both eagerly and lazily.

</div>

<div class="s-why">

**Why**? <br />
A feature module defines clear boundaries between specific functionality and other application features.

</div>

<div class="s-why">

**Why**? <br />
A feature module helps clarify and make it easier to assign development responsibilities to different teams.

</div>

<div class="s-why-last">

**Why**? <br />
A feature module can easily be isolated for testing.

</div>

[Back to top](#toc)

<a id="04-10"></a>

### Shared feature module

#### Style 04-10

<div class="s-rule do">

**Do** create a feature module named `SharedModule` in a `shared` folder; for example, `app/shared/shared.module.ts` defines `SharedModule`.

</div>

<div class="s-rule do">

**Do** declare components, directives, and pipes in a shared module when those items will be re-used and referenced by the components declared in other feature modules.

</div>

<div class="s-rule consider">

**Consider** using the name SharedModule when the contents of a shared
module are referenced across the entire application.

</div>

<div class="s-rule avoid">

**Consider** *not* providing services in shared modules.
Services are usually singletons that are provided once for the entire application or in a particular feature module.
There are exceptions, however.
For example, in the sample code that follows, notice that the `SharedModule` provides `FilterTextService`.
This is acceptable here because the service is stateless;that is, the consumers of the service aren't impacted by new instances.

</div>

<div class="s-rule do">

**Do** import all modules required by the assets in the `SharedModule`; for example, `CommonModule` and `FormsModule`.

</div>

<div class="s-why">

**Why**? <br />
`SharedModule` will contain components, directives and pipes that may need features from another common module; for example, `ngFor` in `CommonModule`.

</div>

<div class="s-rule do">

**Do** declare all components, directives, and pipes in the `SharedModule`.

</div>

<div class="s-rule do">

**Do** export all symbols from the `SharedModule` that other feature modules need to use.

</div>

<div class="s-why">

**Why**? <br />
`SharedModule` exists to make commonly used components, directives and pipes available for use in the templates of components in many other modules.

</div>

<div class="s-rule avoid">

**Avoid** specifying app-wide singleton providers in a `SharedModule`.
Intentional singletons are OK.
Take care.

</div>

<div class="s-why">

**Why**? <br />
A lazy loaded feature module that imports that shared module will make its own copy of the service and likely have undesirable results.

</div>

<div class="s-why-last">

**Why**? <br />
You don't want each module to have its own separate instance of singleton services.
Yet there is a real danger of that happening if the `SharedModule` provides a service.

</div>

[Back to top](#toc)

## Components

<a id="05-03"></a>

### Components as elements

#### Style 05-03

<div class="s-rule do">

**Consider** giving components an *element* selector, as opposed to *attribute* or *class* selectors.

</div>

<div class="s-why">

**Why**? <br />
Components have templates containing HTML and optional Angular template syntax.
They display content.
Developers place components on the page as they would native HTML elements and web components.

</div>

<div class="s-why-last">

**Why**? <br />
It is easier to recognize that a symbol is a component by looking at the template's html.

</div>

<div class="alert is-helpful">

There are a few cases where you give a component an attribute, such as when you want to augment a built-in element.
For example, [Material Design](https://material.angular.io/components/button/overview) uses this technique with `<button mat-button>`.
However, you wouldn't use this technique on a custom element.

</div>


[Back to top](#toc)

<a id="05-04"></a>

### Extract templates and styles to their own files

#### Style 05-04

<div class="s-rule do">

**Do** extract templates and styles into a separate file, when more than 3 lines.

</div>

<div class="s-rule do">

**Do** name the template file `[component-name].component.html`, where [component-name] is the component name.

</div>

<div class="s-rule do">

**Do** name the style file `[component-name].component.css`, where [component-name] is the component name.

</div>

<div class="s-rule do">

**Do** specify *component-relative* URLs, prefixed with `./`.

</div>

<div class="s-why">

**Why**? <br />
Large, inline templates and styles obscure the component's purpose and implementation, reducing readability and maintainability.

</div>

<div class="s-why">

**Why**? <br />
In most editors, syntax hints and code snippets aren't available when developing inline templates and styles.
The Angular TypeScript Language Service \(forthcoming\) promises to overcome this deficiency for HTML templates in those editors that support it; it won't help with CSS styles.

</div>

<div class="s-why">

**Why**? <br />
A *component relative* URL requires no change when you move the component files, as long as the files stay together.

</div>

<div class="s-why-last">

**Why**? <br />
The `./` prefix is standard syntax for relative URLs; don't depend on Angular's current ability to do without that prefix.

</div>

[Back to top](#toc)

<a id="05-12"></a>

### Delegate complex component logic to services

#### Style 05-15

<div class="s-rule do">

**Do** limit logic in a component to only that required for the view.
All other logic should be delegated to services.

</div>

<div class="s-rule do">

**Do** move reusable logic to services and keep components simple and focused on their intended purpose.

</div>

<div class="s-why">

**Why**? <br />
Logic may be reused by multiple components when placed within a service and exposed as a function.

</div>

<div class="s-why">

**Why**? <br />
Logic in a service can more easily be isolated in a unit test, while the calling logic in the component can be easily mocked.

</div>

<div class="s-why">

**Why**? <br />
Removes dependencies and hides implementation details from the component.

</div>

<div class="s-why-last">

**Why**? <br />
Keeps the component slim, trim, and focused.

</div>

[Back to top](#toc)

### Put presentation logic in the component class

#### Style 05-17

<div class="s-rule do">

**Do** put presentation logic in the component class, and not in the template.

</div>

<div class="s-why">

**Why**? <br />
Logic will be contained in one place \(the component class\) instead of being spread in two places.

</div>

<div class="s-why-last">

**Why**? <br />
Keeping the component's presentation logic in the class instead of the template improves testability, maintainability, and reusability.

</div>

[Back to top](#toc)

## Appendix

Useful tools and tips for Angular.

[Back to top](#toc)

<a id="A-02"></a>

### File templates and snippets

#### Style A-02

<div class="s-rule do">

**Do** use file templates or snippets to help follow consistent styles and patterns.
Here are templates and/or snippets for some of the web development editors and IDEs.

</div>

<div class="s-rule consider">

[Back to top](#toc)

<!-- links -->

<!-- external links -->

<!-- end links -->

</div>

@reviewed 2022-02-28
