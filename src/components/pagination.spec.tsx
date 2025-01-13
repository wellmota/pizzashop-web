import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './pagination';
import userEvent from '@testing-library/user-event';
import { beforeEach } from 'node:test';

const onPageChangeCallback = vi.fn();

describe('Pagination', () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear();
  });

  it('should display the right amount of pages and results', () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />,
    );

    expect(wrapper.getByText('Page 1 of 20')).toBeInTheDocument();
    expect(wrapper.getByText('Total of 200 items(s)')).toBeInTheDocument();
  });

  it('it should be able to navigate to the next page', async () => {
    const user = userEvent.setup();
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole('button', { name: 'Next Page' });

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(1);
  });

  it('it should be able to navigate to the previous page', async () => {
    const user = userEvent.setup();
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Previous Page',
    });

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(4);
  });
  it('it should be able to navigate to the first page', async () => {
    const user = userEvent.setup();
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole('button', {
      name: 'First page',
    });

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(0);
  });
  it('it should be able to navigate to the last page', async () => {
    const user = userEvent.setup();
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Last page',
    });

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(19);
  });
});
