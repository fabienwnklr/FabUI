import '@fabui/dialog';
import { html, TemplateResult } from 'lit';

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
  title: 'FabUI/FabDialog',
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
  argTypes: {
    visible: false,
  }
};

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args
const Template = (args) => html`<fab-dialog visible></fab-dialog> `;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Primary.args = {
  visible: true,
  // label: 'Button'
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button'
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button'
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button'
// };

