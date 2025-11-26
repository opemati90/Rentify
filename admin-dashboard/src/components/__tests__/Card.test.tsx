import React from 'react';
import { render } from '@testing-library/react';
import { Card } from '../common/Card';

describe('Card Component', () => {
  it('should render children content', () => {
    const { getByText } = render(
      <Card>
        <p>Card Content</p>
      </Card>
    );
    expect(getByText('Card Content')).toBeInTheDocument();
  });

  it('should render title when provided', () => {
    const { getByText } = render(
      <Card title="Test Title">
        <p>Content</p>
      </Card>
    );
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('should not render header when title is not provided', () => {
    const { container } = render(
      <Card>
        <p>Content</p>
      </Card>
    );
    const header = container.querySelector('.card__header');
    expect(header).not.toBeInTheDocument();
  });

  it('should apply default none padding', () => {
    const { container } = render(
      <Card>
        <p>Content</p>
      </Card>
    );
    const body = container.querySelector('.card__body--none');
    expect(body).toBeInTheDocument();
  });

  it('should apply small padding', () => {
    const { container } = render(
      <Card padding="small">
        <p>Content</p>
      </Card>
    );
    const body = container.querySelector('.card__body--small');
    expect(body).toBeInTheDocument();
  });

  it('should apply medium padding', () => {
    const { container } = render(
      <Card padding="medium">
        <p>Content</p>
      </Card>
    );
    const body = container.querySelector('.card__body--medium');
    expect(body).toBeInTheDocument();
  });

  it('should apply large padding', () => {
    const { container } = render(
      <Card padding="large">
        <p>Content</p>
      </Card>
    );
    const body = container.querySelector('.card__body--large');
    expect(body).toBeInTheDocument();
  });

  it('should render actions in header when provided', () => {
    const { getByText } = render(
      <Card title="Test Title" actions={<button>Action</button>}>
        <p>Content</p>
      </Card>
    );
    expect(getByText('Action')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Card className="custom-card">
        <p>Content</p>
      </Card>
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-card');
    expect(card).toHaveClass('card');
  });
});
