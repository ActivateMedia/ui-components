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
import {Alert} from "@activate-spritz-components/spritz-ui-components"

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
import {Badge} from "@activatestudio/spritz-ui-components"

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
import {BoxShadow} from "@activatestudio/spritz-ui-components"

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
import {Brand} from "@activatestudio/spritz-ui-components"

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
import {Button} from "@activatestudio/spritz-ui-components"

<Button type="button"> Click me </Button>
```

#### Props

| Name                 | Type      | Value                                    | Description                                       |
| -------------------- | --------- | ---------------------------------------- | ------------------------------------------------- |
| type (require)       | String    | "button, submit, and reset"              | Button type                                       |
| id (optional)        | String    | "Element id"                             | Pass svg url for brand logo                       |
| children (optional)  | ReactNode | "Html and string"                        | Display content                                   |
| className (optional) | String    | "Css class"                              | Pass class to modify design                       |
| disabled (optional)  | Boolean   | "true/false"                             | Is disabled button                                |
| leftIcon (optional)  | String    | "svg icon path"                          | Pass icon to display icon on left side of button  |
| rightIcon (optional) | String    | "svg icon path"                          | Pass icon to display icon on right side of button |
| iconColor (optional) | Hex code  | "Icon color code"                        | Pass color for icon                               |
| onClick (optional)   | Function  | "onClick={()=>{console.log('clicked')}}" | Handle button on click                            |

---

## DaySelector

React Day selector button

```Javascript
import {DaySelector} from "@activatestudio/spritz-ui-components"

<DaySelector letter="M" selected={true} onClick={()=>{console.log("clicked")}} />
```

#### Props

| Name                 | Type     | Value                                    | Description                 |
| -------------------- | -------- | ---------------------------------------- | --------------------------- |
| letter (require)     | String   | "Week first latter"                      | Week first name with badge  |
| selected (required)  | Boolean  | "true/false"                             | Is selected                 |
| className (optional) | String   | "Css class"                              | Pass class to modify design |
| onClick (required)   | Function | "onClick={()=>{console.log('clicked')}}" | Handle button on click      |

---

# React-redux Form Elements

## Checkbox

React redux form checkbox element

```Javascript
import { Field, reduxForm } from 'redux-form';
import {Checkbox} from "@activatestudio/spritz-ui-components"

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

| Name                 | Type     | Value                                              | Description                 |
| -------------------- | -------- | -------------------------------------------------- | --------------------------- |
| label (require)      | String   | "Checkbox display label"                           | Label of check box          |
| type (require)       | String   | "checkbox"                                         | Type of checkbox            |
| name (require)       | String   | "checkbox"                                         | Name of checkbox            |
| id (optional)        | String   | "id"                                               | Id of checkbox              |
| className (optional) | String   | "Css class"                                        | Pass class to modify design |
| onChange (required)  | Function | "onChange={(ele: any)=>{console.log(ele.target)}}" | Handle checkbox on change   |

---

## DropDown

React redux form Dropdown element

```Javascript
import { Field, reduxForm } from 'redux-form';
import {DropDown} from "@activatestudio/spritz-ui-components"

const ReduxForm: FunctionComponent<any> = (props)=>{
return (
   <form>
      <Field
        component={DropDown}
        label="Dropdown 01"
        className=""
        input = {}
        options = ['one', 'two', 'three']
      />
   </form>
   )
}

export default reduxForm<any, any, string>({
  form: 'dropdownForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(ReduxForm);

```

#### Props

| Name                  | Type   | Value                     | Description                 |
| --------------------- | ------ | ------------------------- | --------------------------- |
| label (require)       | String | "Dropdown display label"  | Label of dropdown           |
| classname (require)   | String | "Css class"               | Pass class to modify design |
| input (require)       | String | "input"                   | input for dropdown          |
| id (optional)         | String | "id"                      | Id of dropdown              |
| className (optionsal) | String | "Css class"               | Pass class to modify design |
| options (required)    | Array  | "['one', 'two', 'three']" | Options for dropdown        |

---

## FloatingInput

React redux form FloatingInput element

```Javascript
import { Field, reduxForm } from 'redux-form';
import {FloatingInput} from "@activatestudio/spritz-ui-components"

const ReduxForm: FunctionComponent<any> = (props)=>{
return (
   <form>
      <Field
        component={FloatingInput}
        placeholder="FloatingInput"
      />
   </form>
   )
}

export default reduxForm<any, any, string>({
  form: 'FloatingInputForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(ReduxForm);

```

#### Props

| Name                     | Type   | Value                                 | Description                         |
| ------------------------ | ------ | ------------------------------------- | ----------------------------------- |
| placeholder (required)   | String | "FloatingInput"                       | Placeholder of FloatingInput        |
| input (optional)         | String | "input"                               | input for FloatingInput             |
| step (optional)          | String | "input"                               | input for FloatingInput             |
| label (optional)         | String | "Checkbox display label"              | Label of FloatingInput              |
| type (optional)          | String | "FloatingInput"                       | Type of FloatingInput               |
| initianlValue (optional) | String | "FloatingInput"                       | initianlValue of FloatingInput      |
| id (optional)            | String | "id"                                  | Id of FloatingInput                 |
| className (optional)     | String | "Css class"                           | Pass class to modify design         |
| meta (optional)          | Object | "{touched?: boolean; error?: string;} | Handle meta tags for floating input |
| metaError (optional)     | String | "{touched:false}"                     | Meta Error for floating input       |
| min (optional)           | Number | "input"                               | Minimun number for FloatingInput    |

---

## MultiSelect

React redux form MultiSelect element

```Javascript
import { Field, reduxForm } from 'redux-form';
import {MultiSelect} from "@activatestudio/spritz-ui-components"

const ReduxForm: FunctionComponent<any> = (props)=>{
return (
   <form>
      <Field
        component={MultiSelect}
      />
   </form>
   )
}

export default reduxForm<any, any, string>({
  form: 'MultiSelectForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(ReduxForm);

```

#### Props

| Name                 | Type   | Value                                 | Description                         |
| -------------------- | ------ | ------------------------------------- | ----------------------------------- |
| input (optional)     | String | "input"                               | input for MultiSelect               |
| dataType (optional)  | String | "MultiSelect"                         | Data Type of MultiSelect            |
| id (optional)        | String | "id"                                  | Id of MultiSelect                   |
| className (optional) | String | "Css class"                           | Pass class to modify design         |
| meta (optional)      | Object | "{touched?: boolean; error?: string;} | Handle meta tags for floating input |
| metaError (optional) | String | "{touched:false}"                     | Meta Error for floating input       |
| options (optional)   | Array  | "['one', 'two', 'three']"             | Options for MultiSelect             |

---

## RadioButton

React redux form RadioButton element

```Javascript
import { Field, reduxForm } from 'redux-form';
import {RadioButton} from "@activatestudio/spritz-ui-components"

const ReduxForm: FunctionComponent<any> = (props)=>{
return (
   <form>
      <Field
        component={RadioButton}
        label='Radio Button'
        labelClass=''
        className=''
        input={'Input of radio'}
        dataType="radio"
      />
   </form>
   )
}

export default reduxForm<any, any, string>({
  form: 'MultiSelectForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(ReduxForm);

```

#### Props

| Name                  | Type   | Value                                 | Description                         |
| --------------------- | ------ | ------------------------------------- | ----------------------------------- |
| input (required)      | String | "input"                               | input for RadioButton               |
| dataType (required)   | String | "RadioButton"                         | Data Type of RadioButton            |
| id (optional)         | String | "id"                                  | Id of RadioButton                   |
| className (required)  | String | "Css class"                           | Pass class to modify design         |
| labelClass (required) | String | "Css class"                           | Pass class to modify design         |
| label (optional)      | String | "RadioButton display label"           | RadioButton of FloatingInput        |
| meta (optional)       | Object | "{touched?: boolean; error?: string;} | Handle meta tags for floating input |
| metaError (optional)  | String | "{touched:false}"                     | Meta Error for floating input       |

---

## SearchInput

React redux form SearchInput element

```Javascript
import { Field, reduxForm } from 'redux-form';
import {SearchInput} from "@activatestudio/spritz-ui-components"

const ReduxForm: FunctionComponent<any> = (props)=>{
return (
   <form>
      <Field
        component={SearchInput}
        options={[ value: '',
                    label: 'Select an agent',
                    color: '#0C0F13']}
        onChange={(ele: any)=>{console.log(ele.target)}}

      />
   </form>
   )
}

export default reduxForm<any, any, string>({
  form: 'SearchInputForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(ReduxForm);

```

#### Props

| Name                        | Type     | Value                                                      | Description                       |
| --------------------------- | -------- | ---------------------------------------------------------- | --------------------------------- |
| options (required)          | Array    | "[value:'one', label:'two', color:'#0000']"                | Options for search-input          |
| className (optional)        | String   | "Css class"                                                | Pass class to modify design       |
| optionClass (optional)      | String   | "Css class"                                                | Pass class to modify design       |
| panelClass (optional)       | String   | "Css class"                                                | Pass class to modify design       |
| selectedOption (optional)   | Array    | "[value:'one', label:'two', color:'#0000']"                | Selected options for search-input |
| color (optional)            | String   | "#0000"                                                    | Pass color to modify design       |
| setAgentForInput (optional) | Function | "setAgentForInput={(ele: any)=>{console.log(ele.target)}}" | Handle agent for input on change  |
| onChange (optional)         | Function | "onChange={(ele: any)=>{console.log(ele.target)}}"         | Handle search-input on change     |

---

## SelectFilter

React redux form SelectFilter element

```Javascript
import { Field, reduxForm } from 'redux-form';
import {SelectFilter} from "@activatestudio/spritz-ui-components"

const ReduxForm: FunctionComponent<any> = (props)=>{
return (
   <form>
      <Field
        component={SelectFilter}
        options={[
          {
            value: 'completed',
            label: 'Complete'
          },
          { value: 'failed', label: 'Failed' }
        ]}
        applyFilter={{(ele: any)=>{console.log(ele.target)}}}
        selectedFilter={'selectedFilter'}
        buttonClass={'w-36 font-semibold '}
        setSelectedFilter={(ele: any)=>{console.log(ele.target)}}
        setClassName={(ele: any)=>{console.log(ele.target)}}
      />
   </form>
   )
}

export default reduxForm<any, any, string>({
  form: 'SelectFilterForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(ReduxForm);

```

#### Props

| Name                         | Type     | Value                                                       | Description                            |
| ---------------------------- | -------- | ----------------------------------------------------------- | -------------------------------------- |
| options (required)           | Array    | "[value:'one', label:'two', color:'#0000']"                 | Options for select-filter              |
| className (optional)         | String   | "Css class"                                                 | Pass class to modify design            |
| optionClass (optional)       | String   | "Css class"                                                 | Pass class to modify design            |
| panelClass (optional)        | String   | "Css class"                                                 | Pass class to modify design            |
| defaultOption (optional)     | String   | "[value:'one']"                                             | Pass default option for select-filter  |
| buttonClass (required)       | String   | "Css class"                                                 | Pass class to modify design            |
| selectedFilter (required)    | String   | "Select-filter"                                             | Pass selected filter for select-filter |
| setSelectedFilter (required) | Function | "setSelectedFilter={(ele: any)=>{console.log(ele.target)}}" | Handle selected filter                 |
| applyFilter (required)       | Function | "applyFilter={(ele: any)=>{console.log(ele.target)}}"       | Handle filter on applied Filter        |
| setClassName (required)      | Function | "setClassName={(ele: any)=>{console.log(ele.target)}}"      | Handle class for select-filter         |

---

## SelectInput

React redux form SelectInput element

```Javascript
import { Field, reduxForm } from 'redux-form';
import {SelectInput} from "@activatestudio/spritz-ui-components"

const ReduxForm: FunctionComponent<any> = (props)=>{
return (
   <form>
      <Field
        component={SelectInput}
        options={[
          {
            value: 'completed',
            label: 'Complete'
          },
          { value: 'failed', label: 'Failed' }
        ]}
      />
   </form>
   )
}

export default reduxForm<any, any, string>({
  form: 'SelectInputForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(ReduxForm);

```

#### Props

| Name                        | Type     | Value                                                      | Description                           |
| --------------------------- | -------- | ---------------------------------------------------------- | ------------------------------------- |
| options (required)          | Array    | "[value:'one', label:'two', color:'#0000']"                | Options for select-input              |
| className (optional)        | String   | "Css class"                                                | Pass class to modify design           |
| optionClass (optional)      | String   | "Css class"                                                | Pass class to modify design           |
| panelClass (optional)       | String   | "Css class"                                                | Pass class to modify design           |
| selectedOption (optional)   | String   | "Select-input"                                             | Pass selected option for select-input |
| setAgentForInput (optional) | Function | "setAgentForInput={(ele: any)=>{console.log(ele.target)}}" | Handle agent for input                |
| onChange (optional)         | Function | "onChange={(ele: any)=>{console.log(ele.target)}}"         | Handle select-input on change         |
| color (optional)            | String   | "#0000"                                                    | Pass color to modify design           |

---

## SelectOption

React redux form SelectOption element

```Javascript
import { Field, reduxForm } from 'redux-form';
import {SelectOption} from "@activatestudio/spritz-ui-components"

const ReduxForm: FunctionComponent<any> = (props)=>{
return (
   <form>
      <Field
        component={SelectOption}
        options={[
          {
            value: 'completed',
            label: 'Complete'
            color: '#0000';
            name: 'Option1';
            logo: 'brandLogo';
            type: 'string';
            icon: './brand.svg';
          },
          { value: 'failed', label: 'Failed' }
        ]}
      />
   </form>
   )
}

export default reduxForm<any, any, string>({
  form: 'SelectOptionForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(ReduxForm);

```

#### Props

| Name                   | Type     | Value                                              | Description                    |
| ---------------------- | -------- | -------------------------------------------------- | ------------------------------ |
| options (required)     | Array    | "[value:'one', label:'two', color:'#0000']"        | Options for select-input       |
| optionClass (optional) | String   | "Css class"                                        | Pass class to modify design    |
| panelClass (optional)  | String   | "Css class"                                        | Pass class to modify design    |
| onSelect (optional)    | Function | "onSelect={(ele: any)=>{console.log(ele.target)}}" | Handle select-option on select |

---

## Select

React redux form Select element

```Javascript
import { Field, reduxForm } from 'redux-form';
import {Select} from "@activatestudio/spritz-ui-components"

const ReduxForm: FunctionComponent<any> = (props)=>{
return (
   <form>
      <Field component={Select}/>
   </form>
   )
}

export default reduxForm<any, any, string>({
  form: 'SelectForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(ReduxForm);

```

#### Props

| Name                 | Type   | Value                                       | Description                 |
| -------------------- | ------ | ------------------------------------------- | --------------------------- |
| input (optional)     | String | "input"                                     | input for Select            |
| options (optional)   | Array  | "[value:'one', label:'two', color:'#0000']" | Options for select          |
| label (optional)     | String | "Select display label"                      | Label of Select             |
| dataType (optional)  | String | "Select"                                    | Data Type of Select         |
| id (optional)        | String | "id"                                        | Id of Select                |
| className (optional) | String | "Css class"                                 | Pass class to modify design |
| meta (optional)      | Object | "{touched?: boolean; error?: string;}       | Handle meta tags for select |
| metaError (optional) | String | "{touched:false}"                           | Meta Error for select       |

---

## TextArea

React redux form TextArea element

```Javascript
import { Field, reduxForm } from 'redux-form';
import {TextArea} from "@activatestudio/spritz-ui-components"

const ReduxForm: FunctionComponent<any> = (props)=>{
return (
   <form>
      <Field component={TextArea}/>
   </form>
   )
}

export default reduxForm<any, any, string>({
  form: 'TextAreaForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(ReduxForm);

```

#### Props

| Name                   | Type   | Value                                 | Description                 |
| ---------------------- | ------ | ------------------------------------- | --------------------------- |
| input (optional)       | String | "input"                               | input for Select            |
| label (optional)       | String | "Select display label"                | Label of Select             |
| dataType (optional)    | String | "Select"                              | Data Type of Select         |
| id (optional)          | String | "id"                                  | Id of Select                |
| className (optional)   | String | "Css class"                           | Pass class to modify design |
| meta (optional)        | Object | "{touched?: boolean; error?: string;} | Handle meta tags for select |
| metaError (optional)   | String | "{touched:false}"                     | Meta Error for select       |
| placeholder (optional) | String | "TextArea"                            | Placeholder of TextArea     |
| row (optional)         | Number | "1"                                   | Number of rows for TextArea |
| cols (optional)        | Number | "1"                                   | Number of cols forTextArea  |

---

## TextInput

React redux form TextInput element

```Javascript
import { Field, reduxForm } from 'redux-form';
import {TextInput} from "@activatestudio/spritz-ui-components"

const ReduxForm: FunctionComponent<any> = (props)=>{
return (
   <form>
      <Field component={TextInput}/>
   </form>
   )
}

export default reduxForm<any, any, string>({
  form: 'TextInputForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(ReduxForm);

```

#### Props

| Name                      | Type    | Value                                 | Description                                        |
| ------------------------- | ------- | ------------------------------------- | -------------------------------------------------- |
| input (optional)          | String  | "input"                               | input for Text-Input                               |
| label (optional)          | String  | "Text-Input display label"            | Label of Text-Input                                |
| dataType (optional)       | String  | "Text-Input"                          | Data Type of Text-Input                            |
| id (optional)             | String  | "id"                                  | Id of Text-Input                                   |
| className (optional)      | String  | "Css class"                           | Pass class to modify design                        |
| labelClass (optional)     | String  | "Css class"                           | Pass class to modify design                        |
| disabled (optional)       | Boolean | False                                 | Pass boolean to show if text-input disabled or not |
| leftIconClass (optional)  | String  | "Css class"                           | Pass class to modify design                        |
| rightIconClass (optional) | String  | "Css class"                           | Pass class to modify design                        |
| rightIcon (optional)      | String  | "/rightIcon.svg"                      | Pass class to modify design                        |
| leftIcon (optional)       | String  | "/leftIcon.svg"                       | Pass class to modify design                        |
| meta (optional)           | Object  | "{touched?: boolean; error?: string;} | Handle meta tags for select                        |
| placeholder (optional)    | String  | "TextInput"                           | Placeholder of TextInput                           |

---

## Toggle

React redux form Toggle element

```Javascript
import { Field, reduxForm } from 'redux-form';
import {Toggle} from "@activatestudio/spritz-ui-components"

const ReduxForm: FunctionComponent<any> = (props)=>{
return (
   <form>
      <Field component={Toggle}/>
   </form>
   )
}

export default reduxForm<any, any, string>({
  form: 'TextInputForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(ReduxForm);

```

#### Props

| Name                 | Type   | Value                                 | Description                 |
| -------------------- | ------ | ------------------------------------- | --------------------------- |
| input (optional)     | String | "input"                               | input for Text-Input        |
| label (optional)     | String | "Text-Input display label"            | Label of Text-Input         |
| dataType (optional)  | String | "Text-Input"                          | Data Type of Text-Input     |
| className (optional) | String | "Css class"                           | Pass class to modify design |
| meta (optional)      | Object | "{touched?: boolean; error?: string;} | Handle meta tags for toggle |
| metaError (optional) | String | "{touched:false}"                     | Meta Error for toggle       |

---

# Components

## InfiniteScroll

React Infinite Scroll Component

```Javascript
import {InfiniteScroll} from "@activatestudio/spritz-ui-components"

<InfiniteScroll loader={<p className="text-center">Loading...</p>} fetchData={()=>{console.log("clicked")}} >{children} </InfiniteScroll>
```

#### Props

| Name                  | Type      | Value                                               | Description                                        |
| --------------------- | --------- | --------------------------------------------------- | -------------------------------------------------- |
| loader (require)      | ReactNode | "<p className="text-center">Loading...</p>"         | Pass loading context                               |
| children (required)   | ReactNode | "React components"                                  | Pass react node to display in box                  |
| fetchData (require)   | Function  | "fetchData={(ele: any)=>{console.log(ele.target)}}" | Handle fetching data for infinite scroll on change |
| hasmore (optional)    | Boolean   | "True"                                              | Boolean value for data                             |
| endMessage (optional) | ReactNode | "<p className="text-center">End Message</p>"        | Pass end message context                           |
| className (optional)  | String    | "Css class"                                         | Pass class to modify design                        |

---

## InlineSvg

React Inline Svg Component

```Javascript
import {InlineSvg} from "@activatestudio/spritz-ui-components"

<InlineSvg src={`/assets/svg/brand`} />
```

#### Props

| Name                 | Type     | Value                                    | Description                 |
| -------------------- | -------- | ---------------------------------------- | --------------------------- |
| src (require)        | String   | "/assets/svg/brand"                      | Pass source file of svg     |
| height (optional)    | Number   | 200                                      | Pass height of the svg      |
| width (optional)     | Number   | 300                                      | Pass width of the svg       |
| className (optional) | String   | "Css class"                              | Pass class to modify design |
| onClick (optional)   | Function | "onClick={()=>{console.log('clicked')}}" | Handle svg on click         |

---

## Shimmer

React Shimmer Component

```Javascript
import {Shimmer} from "@activatestudio/spritz-ui-components"

<Shimmer/>
```

---

## Document Shimmer

React Document Shimmer Component

```Javascript
import {DocumentShimmer} from "@activatestudio/spritz-ui-components"

<DocumentShimmer/>
```

---

## Modal Shimmer

React Modal Shimmer Component

```Javascript
import {ModalShimmer} from "@activatestudio/spritz-ui-components"

<ModalShimmer/>
```

---

## Queue Shimmer

React Queue Shimmer Component

```Javascript
import {QueueShimmer} from "@activatestudio/spritz-ui-components"

<QueueShimmer/>
```

---

## SideBar Shimmer

React SideBar Shimmer Component

```Javascript
import {SideBarShimmer} from "@activatestudio/spritz-ui-components"

<SideBarShimmer/>
```

---

## ShowMore

React ShowMore Component

```Javascript
import {ShowMore} from "@activatestudio/spritz-ui-components"

<ShowMore />
```

#### Props

| Name                      | Type    | Value       | Description                     |
| ------------------------- | ------- | ----------- | ------------------------------- |
| color (optional)          | String  | "#0000"     | Pass color for SVG              |
| toggleShowMore (optional) | Boolean | True        | Pass boolean value for toggling |
| itemsLeft (optional)      | Number  | 1           | Pass number of items are left   |
| className (optional)      | String  | "Css class" | Pass class to modify design     |

---

## Tabs

React Tabs Component

```Javascript
import {Tabs} from "@activatestudio/spritz-ui-components"

<Tabs label={'Tabs Label'}>{children}</Tabs>
```

#### Props

| Name                | Type      | Value                | Description                       |
| ------------------- | --------- | -------------------- | --------------------------------- |
| label (require)     | String    | "Tabs display label" | Label of Tabs                     |
| children (required) | ReactNode | "React components"   | Pass react node to display in box |

---

## Tooltip

React Tooltip Component

```Javascript
import {Tooltip} from "@activatestudio/spritz-ui-components"

<Tooltip>{children}</Tabs>
```

#### Props

| Name                 | Type      | Value              | Description                       |
| -------------------- | --------- | ------------------ | --------------------------------- |
| title (optional)     | String    | "Tootltip"         | Title of Tooltip                  |
| children (required)  | ReactNode | "React components" | Pass react node to display in box |
| className (optional) | String    | "Css class"        | Pass class to modify design       |

---

## Typography

React Typography components

```Javascript
import {HeadingOne,HeadingTwo,HeadingThree,HeadingFour,
        HeadingFive,HeadingSix,Paragraph} from "@activatestudio/spritz-ui-components"

<HeadingOne>{children}</HeadingOne>
<HeadingTwo>{children}</HeadingTwo>
<HeadingThree>{children}</HeadingThree>
<HeadingFour>{children}</HeadingFour>
<HeadingFive>{children}</HeadingFive>
<HeadingSix>{children}</HeadingSix>
<Paragraph>{children}</Paragraph>
```

#### Props

| Name                 | Type      | Value              | Description                       |
| -------------------- | --------- | ------------------ | --------------------------------- |
| children (required)  | ReactNode | "React components" | Pass react node to display in box |
| className (optional) | String    | "Css class"        | Pass class to modify design       |

---

## PreParagraph

React PreParagraph component

```Javascript
import {PreParagraph} from "@activatestudio/spritz-ui-components"

<PreParagraph>{content}</PreParagraph>
```

#### Props

| Name               | Type      | Value              | Description                       |
| ------------------ | --------- | ------------------ | --------------------------------- |
| content (required) | ReactNode | "React components" | Pass react node to display in box |

---

# Modules

## AppTourConfirmModal

React AppTourConfirmModal Module

```Javascript
import {AppTourConfirmModal} from "@activatestudio/spritz-ui-components"

<AppTourConfirmModal
  modalTilte="AppTourConfirmModal"
  modalDescription="Add To AppTourConfirmModal"
  successBtnText="Success"
  cancelBtnText="Cancecl"
  onClickSuccess={() => console.log('clicked success')}
  onClickCancel={() => console.log('clicked cancel')}
  closeSvg="/assets/svg/closeSmall.svg"
/>
```

#### Props

| Name                            | Type     | Value                                                   | Description                                          |
| ------------------------------- | -------- | ------------------------------------------------------- | ---------------------------------------------------- |
| modalTitle (required)           | String   | "AppTourConfirmModal"                                   | Pass modal title for app tour confirm modal          |
| modalDescription (required)     | String   | "Add To AppTourConfirmModal"                            | Pass modal description for app tour confirm modal    |
| successBtnText (required)       | String   | "Success"                                               | Pass text for success button                         |
| cancelBtnText (required)        | String   | "Cancel"                                                | Pass text for cancel button                          |
| onClickSuccess (required)       | Function | "onClickSuccess={() => console.log('clicked success')}" | Pass function to handle success button               |
| onClickCancel (required)        | Function | "onClickCancel={() => console.log('clicked cancel')}"   | Pass function to handle cancel button                |
| closeSvg (required)             | String   | "/assets/svg/closeSmall.svg"                            | Pass close icon svg url                              |
| modalInstructionText (optional) | String   | "Instruction message"                                   | modal instruction message for app tour confirm modal |
| className (optional)            | String   | "Css class"                                             | Pass class to modify design                          |

---

## BaseModal

React BaseModal Module

```Javascript
import {BaseModal} from "@activatestudio/spritz-ui-components"

<BaseModal
  heading="Base Modal"
  body={<div><p>'Base modal body'</p></div>}
  onCancel={() => console.log('clicked cancel')}
  closeSvg="/assets/svg/closeSmall.svg"
  show={true}
/>
```

#### Props

| Name                      | Type      | Value                                            | Description                                      |
| ------------------------- | --------- | ------------------------------------------------ | ------------------------------------------------ |
| heading (required)        | String    | "Base Modal"                                     | Pass heading for base-modal                      |
| body (required)           | ReactNode | "React components"                               | Pass react node to display in box                |
| show (required)           | Boolean   | "True"                                           | Pass boolean value to show/hide base modal       |
| onCancel (required)       | Function  | "onCancel={() => console.log('clicked cancel')}" | Pass function to handle cancel button            |
| closeSvg (required)       | String    | "/assets/svg/closeSmall.svg"                     | Pass close icon svg url                          |
| isModalLoading (required) | Boolean   | "True"                                           | Pass boolean value to determine if modal loading |
| className (optional)      | String    | "Css class"                                      | Pass class to modify design                      |
| bodyClass (optional)      | String    | "Css class"                                      | Pass class to modify design                      |

---

## ConfirmationModal

React ConfirmationModal Module

```Javascript
import {ConfirmationModal} from "@activatestudio/spritz-ui-components"

<ConfirmationModal
  title="Confirmation Modal"
  subTitle="Add to confimation modal"
  successBtnText="Success"
  cancelBtnText="Cancecl"
  onClickSuccess={() => console.log('clicked success')}
  onClickCancel={() => console.log('clicked cancel')}
  closeSvg="/assets/svg/closeSmall.svg"
/>
```

#### Props

| Name                      | Type     | Value                                                   | Description                            |
| ------------------------- | -------- | ------------------------------------------------------- | -------------------------------------- |
| title (required)          | String   | "Confirmation Modal"                                    | Pass title for confirmation-modal      |
| subTitle (required)       | String   | "Add to confimation modal"                              | Pass subtitle of confirmation-modal    |
| successBtnText (required) | String   | "Success"                                               | Pass text for success button           |
| cancelBtnText (required)  | String   | "Cancel"                                                | Pass text for cancel button            |
| onClickSuccess (required) | Function | "onClickSuccess={() => console.log('clicked success')}" | Pass function to handle success button |
| onClickCancel (required)  | Function | "onClickCancel={() => console.log('clicked cancel')}"   | Pass function to handle cancel button  |
| closeSvg (required)       | String   | "/assets/svg/closeSmall.svg"                            | Pass close icon svg url                |
| height (optional)         | Number   | "400"                                                   | Pass height for the confirmation modal |
| className (optional)      | String   | "Css class"                                             | Pass class to modify design            |

---

## Header

React Header Module

```Javascript
import {Header} from "@activatestudio/spritz-ui-components"

<Header
  token="1234"
  router="any"
  selectedOrgId="Home"
  activeItem="Home"
  menuClickHandler={() => console.log('clicked success')}
  logoClickHandler={() => console.log('clicked success')}
  afterLoginMenu={['Home', 'Login']}
  beforeLoginMenu={[ 'Login']}
  individualLoginMenu={['Home', 'Login']}
  brandSvg="/assets/svg/main-logo.svg"
  barsSvg="/assets/svg/bars3.svg"
  xMarkSvg="/assets/svg/closeSmall.svg"
  arrowSvg="/assets/svg/closeSmall.svg"
  withRouter="any"
/>
```

#### Props

| Name                           | Type     | Value                                      | Description                                          |
| ------------------------------ | -------- | ------------------------------------------ | ---------------------------------------------------- |
| token (required)               | String   | "user token"                               | Pass user token                                      |
| router (required)              | String   | "Router path"                              | Pass router path                                     |
| selectedOrgId (required)       | String   | "Home"                                     | Pass selected Org for Header                         |
| activeItem (required)          | String   | "Home"                                     | Pass active header item                              |
| menuClickHandler (required)    | Function | "menuClickHandler={() => console.log('')}" | Pass function to handle menu click                   |
| logoClickHandler (required)    | Function | "logoClickHandler={() => console.log('')}" | Pass function to handle logo click                   |
| afterLoginMenu (required)      | Array    | "['Home', 'Login']"                        | Pass array of item after user login for header menu  |
| beforeLoginMenu (required)     | Array    | "[ 'Login']"                               | Pass array of item before user login for header menu |
| individualLoginMenu (required) | String   | "['Home' , 'Settings']"                    | Pass array of item for individual login menu         |
| brandSvg (required)            | String   | "/assets/svg/brandSvg.svg"                 | Pass brand icon svg url                              |
| barsSvg (required)             | String   | "/assets/svg/barsSvg.svg"                  | Pass close bars svg url                              |
| xMarkSvg (required)            | String   | "/assets/svg/xMarkSvg.svg"                 | Pass close xMark svg url                             |
| arrowSvg (required)            | String   | "/assets/svg/arrowSvg.svg"                 | Pass close arrow svg url                             |
| withRouter (required)          | String   | "withRouter from redux"                    | Associated with redux router                         |
| SETTING_HEADING (optional)     | String   | "Setting Heading"                          | Pass setting heading                                 |

---

# CustomCalendar
React Custom Calendar component built on top of react-calendar with enhanced styling, formatting, and customization options.

```Javascript
import CustomCalendar from './CustomCalendar';

<CustomCalendar
  value={new Date()}
  containerClassName="rounded-md shadow-md"
  todayClassName="bg-green-500 text-white"
  dayStyle={(date) => ({ borderRadius: '4px' })}
  tileContent={({ date }) => <span>{date.getDate()}</span>}
/>
```
✅ Props


| Name                 | Type                              | Example                                                                    | Description                                                |
| -------------------- | --------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `value`              | `Date \| Date[]`                  | `new Date()`                                                               | Selected date or range                                     |
| `onChange`           | `(value: Date \| Date[]) => void` | `(date) => console.log(date)`                                              | Callback when date is changed                              |
| `containerClassName` | `string`                          | `"rounded shadow bg-white"`                                                | Custom class for the outer container                       |
| `containerStyle`     | `React.CSSProperties`             | `{ backgroundColor: 'white' }`                                             | Inline styles for the outer container                      |
| `tileClassName`      | `string \| (props) => string`     | `({ date }) => 'bg-gray-100'`                                              | Class(es) applied to each date tile                        |
| `tileContent`        | `(props) => React.ReactNode`      | `({ date }) => <span>{date.getDate()}</span>`                              | Custom content for each date tile                          |
| `dayFormat`          | `(locale, date) => string`        | `(locale, date) => date.toLocaleDateString(locale, { weekday: 'narrow' })` | Custom formatter for weekday labels (defaults to 1-letter) |
| `dayStyle`           | `(date, view) => CSSProperties`   | `(date, view) => ({ color: 'red' })`                                       | Custom inline styles for individual date tiles             |
| `todayClassName`     | `string`                          | `"bg-blue-500 text-white"`                                                 | Extra classes added to today's date tile                   |
| `...rest`            | `ReactCalendarProps`              | `minDate={new Date()}`                                                     | All other props supported by `react-calendar`              |


...rest	ReactCalendarProps	All other props from react-calendar	You can pass anything supported by react-calendar

🔧 Example
```Javascript
<CustomCalendar
  value={new Date()}
  onChange={(val) => console.log(val)}
  todayClassName="bg-indigo-500 text-white"
  dayStyle={(date) => ({ padding: '5px', borderRadius: '6px' })}
  tileContent={({ date }) => {
    if (date.getDate() === 1) return <span className="text-red-600">*</span>;
    return null;
  }}
/>
```
📦 Dependencies
react-calendar

CSS: import 'react-calendar/dist/Calendar.css';
