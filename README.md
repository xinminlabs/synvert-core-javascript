 # synvert-core-javascript

<img src="https://synvert.xinminlabs.com/img/logo_96.png" alt="logo" width="32" height="32" />

![Main workflow](https://github.com/xinminlabs/synvert-core-javascript/actions/workflows/main.yml/badge.svg)
[![AwesomeCode Status for xinminlabs/synvert-core-javascript](https://awesomecode.io/projects/24366d99-29b2-407f-a7b8-9773e59f8cd0/status)](https://awesomecode.io/repos/xinminlabs/synvert-core-javascript)

Synvert core provides a set of DSLs to rewrite javascript code. e.g.

```javascript
const Synvert = require("synvert-core");

new Synvert.Rewriter("jquery", "deprecate-event-shorthand", () => {
  description('jQuery event shorthand is deprecated.');

  withinFiles(Synvert.ALL_FILES, function () {
    // $('#test').click(function(e) { });
    // =>
    // $('#test').on('click', function(e) { });
    findNode(`.CallExpression[callee=.MemberExpression[object IN (/^\\$/ /^jQuery/)][property=click]]
                [arguments.length=1][arguments.0.type IN (FunctionExpression ArrowFunctionExpression)]`, () => {
      replace("callee.property", { with: "on" });
      insert("'click', ", { to: "arguments.0", at: "beginning" });
    });

    // $form.submit();
    // =>
    // $form.trigger('submit');
    withNode(
      {
        type: "CallExpression",
        callee: { type: "MemberExpression", object: /^\$/, property: 'submit' },
        arguments: { length: 0 },
      },
      () => {
        replace(["callee.property", "arguments"], { with: "trigger('submit')" });
      }
    );
  });
});
```

Want to see more examples, check out [synvert-snippets-javascript](https://github.com/xinminlabs/synvert-snippets-javascript).

Want to use the CLI, check out [synvert-javascript](https://github.com/xinminlabs/synvert-javascript).

DSL are as follows

* [description](./Rewriter.html#description) - set description of the rewriter
* [ifNode](./Rewriter.html#ifNode) - check if node version is greater than or equal to the specified node version
* [ifNpm](./Rewriter.html#ifNpm) - check the version of the specifid npm package
* [withinFiles](./Rewriter.html#withinFiles) - find specified files
* [withinFile](./Rewriter.html#withinFile) - alias to withinFiles
* [addSnippet](./Rewriter.html#addSnippet) - call another rewriter

Scopes:

* [findNode](./Instance.html#findNode) - recursively find matching ast nodes by node query language
* [withNodes](./Instance.html#withNodes) - recursively find matching ast nodes
* [withNode](./Instance.html#withNode) - alias to withNode
* [gotoNode](./Instance.html#gotoNode) - go to a child node

Conditions:

* [ifExistNode](./Instance.html#ifExistNode) - check if matching node exist in the child nodes
* [unlessExistNode](./Instance.html#unlessExistNode) - check if matching node does not exist in the child nodes
* [ifOnlyExistNode](./Instance.html#ifOnlyExistNode) - check if current node has only one child node and the child node matches rules
* [ifAllNodes](./Instance.html#ifAlNodes) - check if all nodes match or not

Actions:

* [append](./Instance.html#append) - append the code to the bottom of the current node body
* [prepend](./Instance.html#prepend) - prepend the code to the top of the current node body
* [insert](./Instance.html#insert) - insert code
* [replace](./Instance.html#replace) - replace the code of specified child nodes
* [deleteNode](./Instance#deleteNode) - delete code the code of specified child nodes
* [remove](./Instance.html#remove) - remove the whole code of current node
* [replaceWith](./Instance.html#replaceWith) - replace the whole code of current node
