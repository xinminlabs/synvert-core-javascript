const espree = require("espree");

const Instance = require("../lib/instance");
const { Action, ReplaceAction, ReplaceWithAction } = require("../lib/action");

const parse = (code) => espree.parse(code, { ecmaVersion: 'latest', loc: true, sourceFile: 'code.js' }).body[0];

describe("action", () => {
  const node = parse("class FooBar {}");
  const instance = new Instance({}, '', function() {})
  instance.currentNode = node
  const action = new Action(instance, '{{id}}');

  it("gets rewrittenSource", function() {
    expect(action.rewrittenSource()).toBe("FooBar");
  });
});

describe("ReplaceAction", () => {
  const node = parse("class FooBar {}");
  const instance = new Instance({}, '', function() {})
  instance.currentNode = node
  const action = new ReplaceAction(instance, 'id', { with: 'Synvert' });

  it("gets beginPos", function() {
    expect(action.beginPos()).toBe(6);
  });

  it("gets endPos", function() {
    expect(action.endPos()).toBe(12);
  });

  it("gets rewrittenCode", function() {
    expect(action.rewrittenCode()).toBe("Synvert");
  });
});

describe("ReplaceWithAction", () => {
  const node = parse("!!foobar");
  const instance = new Instance({}, '', function() {})
  instance.currentNode = node
  const action = new ReplaceWithAction({ currentNode: node }, 'Boolean({{expression.argument.argument}})');

  it("gets beginPos", function() {
    expect(action.beginPos()).toBe(0);
  });

  it("gets endPos", function() {
    expect(action.endPos()).toBe(8);
  });

  it("gets rewrittenCode", function() {
    expect(action.rewrittenCode()).toBe("Boolean(foobar)");
  });
});