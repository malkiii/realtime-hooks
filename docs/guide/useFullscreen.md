# useFullscreen

Toggle the fullscreen mode on a target element using this hook.

## Parameters

- a `ref` object of the target element.

## Return Values

| Name          | Type      | Description                                                                                                                                              |
| ------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ref**       | RefObject | the target element reference.                                                                                                                            |
| **isEnabled** | Boolean   | indicates whether the fullscreen mode is enabled on the target element or not.                                                                           |
| **isError**   | Unknown   | indicates whether is there an error or not.                                                                                                              |
| **enter**     | Function  | enter to fullscreen mode, and it can take some fullscreen [options](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen#options). |
| **exit**      | Function  | exit from the fullscreen mode .                                                                                                                          |
| **toggle**    | Function  | toggle between enter and exit, and it can take a `boolean` to force it.                                                                                  |

## Example Usage

```tsx
import { useFullscreen } from 'react-pre-hooks';

export default function Example() {
  const fullscreen = useFullscreen();

  return (
    <main>
      <div onClick={() => fullscreen.toggle()}>
        {fullscreen.isEnabled ? 'Exit' : 'Enter'} fullscreen!
      </div>
    </main>
  );
}
```
