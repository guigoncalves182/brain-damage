/* eslint-disable @typescript-eslint/no-require-imports */
const React = require("react");
global.React = React;

// Mock window.alert
global.alert = jest.fn();

require("@testing-library/jest-dom");
/* eslint-enable @typescript-eslint/no-require-imports */
