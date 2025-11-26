import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../common/Button';

describe('Button Component', () => {
  it('should render with title', () => {
    const { getByText } = render(
      <Button onPress={() => {}} title="Click Me" />
    );
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button onPress={onPressMock} title="Click Me" />
    );

    fireEvent.press(getByText('Click Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('should not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button onPress={onPressMock} title="Click Me" disabled />
    );

    fireEvent.press(getByText('Click Me'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('should show loading spinner when loading', () => {
    const { queryByText, UNSAFE_getByType } = render(
      <Button onPress={() => {}} title="Click Me" loading />
    );

    expect(queryByText('Click Me')).toBeTruthy();
    expect(UNSAFE_getByType('ActivityIndicator')).toBeTruthy();
  });

  it('should apply primary variant styles by default', () => {
    const { getByText } = render(
      <Button onPress={() => {}} title="Click Me" />
    );

    const button = getByText('Click Me').parent;
    expect(button?.props.style).toContainEqual(
      expect.objectContaining({ backgroundColor: '#EF4444' })
    );
  });

  it('should apply secondary variant styles', () => {
    const { getByText } = render(
      <Button onPress={() => {}} title="Click Me" variant="secondary" />
    );

    const button = getByText('Click Me').parent;
    expect(button?.props.style).toContainEqual(
      expect.objectContaining({ backgroundColor: '#FFFFFF' })
    );
  });

  it('should apply outline variant styles', () => {
    const { getByText } = render(
      <Button onPress={() => {}} title="Click Me" variant="outline" />
    );

    const button = getByText('Click Me').parent;
    expect(button?.props.style).toContainEqual(
      expect.objectContaining({
        backgroundColor: 'transparent',
        borderColor: '#EF4444'
      })
    );
  });

  it('should apply small size styles', () => {
    const { getByText } = render(
      <Button onPress={() => {}} title="Click Me" size="small" />
    );

    const button = getByText('Click Me').parent;
    expect(button?.props.style).toContainEqual(
      expect.objectContaining({ paddingVertical: 8 })
    );
  });

  it('should apply medium size styles by default', () => {
    const { getByText } = render(
      <Button onPress={() => {}} title="Click Me" />
    );

    const button = getByText('Click Me').parent;
    expect(button?.props.style).toContainEqual(
      expect.objectContaining({ paddingVertical: 14 })
    );
  });

  it('should apply large size styles', () => {
    const { getByText } = render(
      <Button onPress={() => {}} title="Click Me" size="large" />
    );

    const button = getByText('Click Me').parent;
    expect(button?.props.style).toContainEqual(
      expect.objectContaining({ paddingVertical: 18 })
    );
  });

  it('should apply full width styles', () => {
    const { getByText } = render(
      <Button onPress={() => {}} title="Click Me" fullWidth />
    );

    const button = getByText('Click Me').parent;
    expect(button?.props.style).toContainEqual(
      expect.objectContaining({ width: '100%' })
    );
  });

  it('should apply custom styles', () => {
    const customStyle = { marginTop: 20 };
    const { getByText } = render(
      <Button onPress={() => {}} title="Click Me" style={customStyle} />
    );

    const button = getByText('Click Me').parent;
    expect(button?.props.style).toContainEqual(customStyle);
  });
});
