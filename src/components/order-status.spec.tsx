import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { OrderStatus } from './order-status';

describe('Order Status', () => {
  it('should render the right text based when order status is pending', () => {
    /* Pending */
    const wrapper = render(<OrderStatus status="pending" />);

    const statusText = wrapper.getByText('Pending');

    const badgeElement = wrapper.getByTestId('badge');

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-slate-400');
  });

  it('should render the right text based when order status is canceled', () => {
    /* canceled */
    const wrapper = render(<OrderStatus status="canceled" />);

    const statusText = wrapper.getByText('Canceled');

    const badgeElement = wrapper.getByTestId('badge');

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-rose-500');
  });

  it('should render the right text based when order status is delivering', () => {
    /* delivering */
    const wrapper = render(<OrderStatus status="delivering" />);

    const statusText = wrapper.getByText('Delivering');

    const badgeElement = wrapper.getByTestId('badge');

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-amber-500');
  });
  it('should render the right text based when order status is delivered', () => {
    /* delivered */
    const wrapper = render(<OrderStatus status="delivered" />);

    const statusText = wrapper.getByText('Delivered');

    const badgeElement = wrapper.getByTestId('badge');

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-emerald-500');
  });
  it('should render the right text based when order status is processing', () => {
    /* processing */
    const wrapper = render(<OrderStatus status="processing" />);

    const statusText = wrapper.getByText('Processing');

    const badgeElement = wrapper.getByTestId('badge');

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-yellow-500');
  });
});
