import { html, fixture, expect } from '@open-wc/testing';

import { FabDialog } from '../types/fab-dialog';
import '../src/fab-dialog';

describe('FabDialog', () => {
  it('basic not visible fab-modal', async () => {
    const el: FabDialog = await fixture(html` <fab-dialog></fab-dialog> `);

    expect(el.visible).to.equal(false);
    expect(el.$el).to.be.style('display', 'none');
    expect(el.$el).to.not.have.class('show');
    expect(el.$el).to.not.have.class('focused');
  });

  it('basic visible fab-modal', async () => {
    const el: FabDialog = await fixture(html` <fab-dialog visible></fab-dialog> `);

    expect(el.visible).to.equal(true);
    expect(el.$el).to.be.style('display', 'flex');
    expect(el.$el).to.have.class('show');
    expect(el.$el).to.have.class('focused');
  });
});
