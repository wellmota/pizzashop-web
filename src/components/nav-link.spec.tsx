import { describe, expect, it } from 'vitest';
import { NavLink } from './nav-links';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('NavLink', {}, () => {
  it('should highlight the current page link', () => {
    const wrapper = render(<NavLink to="/">Home</NavLink>, {
      wrapper: ({ children }) => {
        return (
          <MemoryRouter initialEntries={['/about']}>{children}</MemoryRouter>
        );
      },
    });

    expect(wrapper.getByText('Home').dataset.current).toEqual('false');
  });
});
