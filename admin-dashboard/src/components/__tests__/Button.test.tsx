import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../common/Button';

describe('Button Component', () => {
  it('should render children text', () => {
    const { getByText } = render(
      <Button onClick={() => {}}>Click Me</Button>
    );
    expect(getByText('Click Me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock}>Click Me</Button>
    );

    fireEvent.click(getByText('Click Me'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock} disabled>
        Click Me
      </Button>
    );

    fireEvent.click(getByText('Click Me'));
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    const { getByRole } = render(
      <Button onClick={() => {}} disabled>
        Click Me
      </Button>
    );

    expect(getByRole('button')).toBeDisabled();
  });

  it('should apply default medium size', () => {
    const { container } = render(<Button onClick={() => {}}>Click Me</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('btn--medium');
  });

  it('should apply small size', () => {
    const { container } = render(
      <Button onClick={() => {}} size="small">
        Click Me
      </Button>
    );
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('btn--small');
  });

  it('should apply large size', () => {
    const { container } = render(
      <Button onClick={() => {}} size="large">
        Click Me
      </Button>
    );
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('btn--large');
  });

  it('should apply primary variant by default', () => {
    const { container } = render(<Button onClick={() => {}}>Click Me</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('btn--primary');
  });

  it('should apply secondary variant', () => {
    const { container } = render(
      <Button onClick={() => {}} variant="secondary">
        Click Me
      </Button>
    );
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('btn--secondary');
  });

  it('should apply danger variant', () => {
    const { container } = render(
      <Button onClick={() => {}} variant="danger">
        Click Me
      </Button>
    );
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('btn--danger');
  });

  it('should apply full width class', () => {
    const { container } = render(
      <Button onClick={() => {}} fullWidth>
        Click Me
      </Button>
    );
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('btn--full-width');
  });

  it('should show loading state', () => {
    const { container } = render(
      <Button onClick={() => {}} loading>
        Click Me
      </Button>
    );
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('btn--loading');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Button onClick={() => {}} className="custom-class">
        Click Me
      </Button>
    );
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('btn');
  });

  it('should render button element by default', () => {
    const { getByRole } = render(<Button onClick={() => {}}>Click Me</Button>);
    expect(getByRole('button')).toBeInTheDocument();
  });
});
