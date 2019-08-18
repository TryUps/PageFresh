# PageFresh (version: 1.2.3)

## How use


### Import
* Import plugin to your index page:
```html
<script type="text/javascript" src="https://github.com/TryUps/PageFresh/releases/download/1.2.3/pagefresh.min.js"></script>
```

### Usage and Configure
* You have to create a script like this:
```javascript
const fresh = new Fresh({
    "el":"body",
    "settings":{
        "folder":"/pages/"
    }
});
```

## Last Fixes
* Fixed non declared variable that error.

just this.