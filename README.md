# Spritz UI Components

This package provides shareable, small UI components designed for Spritz partners. These components aim to enhance user experience by offering easy-to-integrate, visually appealing elements for your applications. Use this package to streamline your development process, ensuring a consistent and polished interface across your projects.

### The Primary Benefits of This Package

1. **Enhanced User Experience:** The package offers visually appealing and user-friendly UI components, ensuring a better user interface for your applications.

2. **Easy Integration:** Designed for simplicity, these components can be seamlessly integrated into your projects, saving you time and effort.

3. **Consistency:** Achieve a uniform look and feel across your applications with standardized components, enhancing brand consistency.

4. **Efficiency:** Streamline your development process by utilizing pre-built components, allowing you to focus on core functionality.

5. **Customization:** Easily customizable components to fit the specific needs of your project, providing flexibility without compromising on quality.

## Compatibility

react.js: >= 18.x.x,  
node: >= 18.x.x,  
next.js: >= 13.x.x

## Installation

To install this package use:

```bash
 npm install @activatestudio/spritz-ui-components
```

## Quick start

You can read the section below to learn how to use these components in your project.

## Documentation

## Alert

Custom alert component to display alert message

```Javascript
import {Alert} from "@activatestudio/ui-components"

<Alert type="success"> I am success alter message </Alert>
```

#### Props

| Name               | Type   | Value                            | Description                              |
| ------------------ | ------ | -------------------------------- | ---------------------------------------- |
| type (required)    | String | "success", "warning" and "error" | Pass message type for color and bg color |
| message (required) | String | "Message"                        | Content for display in alert             |

---

## Badge

Custom badge component to display badge

```Javascript
import {Badge} from "@activatestudio/ui-components"

<Badge type="success"> I am success alter message </Alert>
```

#### Props

| Name                 | Type   | Value                              | Description                                   |
| -------------------- | ------ | ---------------------------------- | --------------------------------------------- |
| badgeText (required) | String | "Message"                          | Pass text to display in badge                 |
| className (optional) | String | "overwrite design with your class" | To modify badge design according to your need |

---

## Box Shadow

Custom shadow component to display box with shadow

```Javascript
import {BoxShadow} from "@activatestudio/ui-components"

<BoxShadow> I am success alter message </BoxShadow>
```

#### Props

| Name                 | Type      | Value                              | Description                                        |
| -------------------- | --------- | ---------------------------------- | -------------------------------------------------- |
| children (required)  | ReactNode | "React components"                 | Pass react node to display in box                  |
| className (optional) | String    | "overwrite design with your class" | Pass class to modify design according to your need |

---

## Brand

Logo with brand name

```Javascript
import {Brand} from "@activatestudio/ui-components"

<Brand svg="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/acid.svg" />
```

#### Props

| Name                    | Type     | Value                                | Description                 |
| ----------------------- | -------- | ------------------------------------ | --------------------------- |
| svg (required)          | String   | "Svg url"                            | Pass svg url for brand logo |
| clickHandler (optional) | Function | clickHandler={(e)=>{console.log(e)}} | On element click handler    |

---

## Button

React button

```Javascript
import {Button} from "@activatestudio/ui-components"

<Button type="button"> Click me </Button>
```

#### Props

| Name                | Type      | Value                                    | Description                                       |
| ------------------- | --------- | ---------------------------------------- | ------------------------------------------------- |
| type (require)      | String    | "button, submit, and reset"              | Button type                                       |
| id (optional)       | String    | "Element id"                             | Pass svg url for brand logo                       |
| children (options)  | ReactNode | "Html and string"                        | Display content                                   |
| className (options) | String    | "Css class"                              | Pass class to modify design                       |
| disabled (options)  | Boolean   | "true/false"                             | Is disabled button                                |
| leftIcon (options)  | String    | "svg icon path"                          | Pass icon to display icon on left side of button  |
| rightIcon (options) | String    | "svg icon path"                          | Pass icon to display icon on right side of button |
| iconColor (options) | Hex code  | "Icon color code"                        | Pass color for icon                               |
| onClick (options)   | Function  | "onClick={()=>{console.log('clicked')}}" | Handle button on click                            |

---

## DaySelector

React Day selector button

```Javascript
import {DaySelector} from "@activatestudio/ui-components"

<DaySelector letter="M" selected={true} onClick={()=>{console.log("clicked")}} />
```

#### Props

| Name                | Type     | Value                                    | Description                 |
| ------------------- | -------- | ---------------------------------------- | --------------------------- |
| letter (require)    | String   | "Week first latter"                      | Week first name with badge  |
| selected (required) | Boolean  | "true/false"                             | Is selected                 |
| className (options) | String   | "Css class"                              | Pass class to modify design |
| onClick (required)  | Function | "onClick={()=>{console.log('clicked')}}" | Handle button on click      |

---

# React-redux Form Elements

## Checkbox

React redux form checkbox element

```Javascript
import { Field, reduxForm } from 'redux-form';
import {Checkbox} from "@activatestudio/ui-components"

const ReduxForm: FunctionComponent<any> = (props)=>{
return (
   <form>
      <Field
        component={Checkbox}
        label="Checkbox 01"
        name="checkbox"
        type="checkbox"
        className=""
        onChange={(ele: any)=>{console.log(ele.target)}}
      />
   </form>
   )
}

export default reduxForm<any, any, string>({
  form: 'checkboxForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(ReduxForm);

```

#### Props

| Name                | Type     | Value                                              | Description                 |
| ------------------- | -------- | -------------------------------------------------- | --------------------------- |
| label (require)     | String   | "Checkbox display label"                           | Label of check box          |
| type (require)      | String   | "checkbox"                                         | Type of checkbox            |
| name (require)      | String   | "checkbox"                                         | Name of checkbox            |
| id (optional)       | String   | "id"                                               | Id of checkbox              |
| className (options) | String   | "Css class"                                        | Pass class to modify design |
| onChange (required) | Function | "onChange={(ele: any)=>{console.log(ele.target)}}" | Handle checkbox on change   |

---
