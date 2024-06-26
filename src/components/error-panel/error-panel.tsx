import Image from 'next/image';

import errorIcon from '@/assets/error-icon.svg';

import { styled } from './error-panel.styles';

export default function ErrorPanel({
  message,
}: Readonly<{
  message: string;
}>) {
  return (
    <styled.ErrorContainer>
      <Image width={64} height={64} alt="Error" src={errorIcon} />
      <styled.ErrorText>{message}</styled.ErrorText>
    </styled.ErrorContainer>
  );
}
