import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { FabClockpicker } from '../src/fab-clockpicker.js';
import '../src/fab-clockpicker';

describe('FabClockpicker', () => {
  it('init clockpicker must be hidden', async () => {
    const el = await fixture<FabClockpicker>(
      html`<fab-clockpicker></fab-clockpicker>`
    );

    expect(el.$clockpicker).to.has.style('display', 'none');
    expect(el.$clockpicker).to.has.style('opacity', '0');
    expect(el.$clockpicker).to.has.style('height', '0');
    expect(el.$clockpicker?.classList).not.contain('show');
    expect(el.$clockpicker?.classList).not.contain('show');
  });
});
