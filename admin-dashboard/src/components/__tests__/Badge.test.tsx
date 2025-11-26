import React from 'react';
import { render } from '@testing-library/react';
import { Badge } from '../common/Badge';

describe('Badge Component', () => {
  it('should render children text', () => {
    const { getByText } = render(<Badge>Test Badge</Badge>);
    expect(getByText('Test Badge')).toBeInTheDocument();
  });

  it('should apply default medium size', () => {
    const { container } = render(<Badge>Test</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('badge--medium');
  });

  it('should apply small size', () => {
    const { container } = render(<Badge size="small">Test</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('badge--small');
  });

  it('should apply large size', () => {
    const { container } = render(<Badge size="large">Test</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('badge--large');
  });

  it('should apply success variant', () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('badge--success');
  });

  it('should apply warning variant', () => {
    const { container } = render(<Badge variant="warning">Warning</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('badge--warning');
  });

  it('should apply danger variant', () => {
    const { container } = render(<Badge variant="danger">Danger</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('badge--danger');
  });

  it('should apply info variant', () => {
    const { container } = render(<Badge variant="info">Info</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('badge--info');
  });

  it('should apply custom className', () => {
    const { container } = render(<Badge className="custom-class">Test</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('custom-class');
    expect(badge).toHaveClass('badge');
  });
});
