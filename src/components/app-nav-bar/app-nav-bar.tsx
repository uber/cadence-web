'use client';
import { AppNavBar as BaseAppNavBar } from 'baseui/app-nav-bar';
import NextLink from 'next/link';

import useStyletronClasses from '@/hooks/use-styletron-classes';

import { cssStyles } from './app-nav-bar.styles';

export default function AppNavBar() {
  const { cls } = useStyletronClasses(cssStyles);
  return (
    <BaseAppNavBar
      title={
        <NextLink href="/">
          <svg
            className={cls.titleIcon}
            viewBox="0 0 92 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m0.66 12.278c0-0.44 0.029333-0.8653 0.088-1.276 0.073333-0.4253 0.176-0.836 0.308-1.232s0.29333-0.7773 0.484-1.144 0.40333-0.71133 0.638-1.034c0.24933-0.33733 0.51333-0.65267 0.792-0.946 0.29333-0.29333 0.60867-0.55733 0.946-0.792 0.33733-0.24933 0.69667-0.46934 1.078-0.66001 0.38133-0.19066 0.77733-0.35199 1.188-0.48399 0.42533-0.132 0.858-0.22733 1.298-0.286 0.45467-0.07333 0.91667-0.11 1.386-0.11 1.3787 0 2.64 0.308 3.784 0.924s2.09 1.4153 2.838 2.398l-2.31 1.694c-0.4987-0.704-1.1293-1.2613-1.892-1.672-0.7627-0.42533-1.5547-0.638-2.376-0.638-0.36667 0-0.726 0.03667-1.078 0.11-0.33733 0.05867-0.66733 0.154-0.99 0.286-0.308 0.11733-0.60133 0.264-0.88 0.44s-0.53533 0.3813-0.77 0.616-0.44733 0.49129-0.638 0.76999-0.352 0.57931-0.484 0.90201-0.23467 0.66-0.308 1.012c-0.05867 0.352-0.088 0.726-0.088 1.122s0.03667 0.7773 0.11 1.144c0.07333 0.352 0.176 0.6893 0.308 1.012s0.29333 0.6233 0.484 0.902 0.40333 0.5353 0.638 0.77 0.49133 0.44 0.77 0.616 0.572 0.33 0.88 0.462c0.32267 0.1173 0.65267 0.2127 0.99 0.286 0.33733 0.0587 0.68933 0.088 1.056 0.088 0.88 0 1.7013-0.198 2.464-0.594 0.7773-0.4107 1.4007-0.9753 1.87-1.694l2.31 1.694c-0.7187 0.9827-1.65 1.782-2.794 2.398s-2.42 0.924-3.828 0.924c-0.484 0-0.95333-0.0367-1.408-0.11-0.45467-0.0587-0.89467-0.154-1.32-0.286-0.41067-0.132-0.80667-0.2933-1.188-0.484s-0.748-0.4033-1.1-0.638c-0.33733-0.2347-0.65267-0.4987-0.946-0.792-0.27867-0.2933-0.54267-0.6013-0.792-0.924-0.24933-0.3373-0.46933-0.6893-0.66-1.056-0.176-0.3667-0.33-0.748-0.462-1.144-0.132-0.4107-0.23467-0.8287-0.308-1.254-0.058667-0.4253-0.088-0.8653-0.088-1.32zm15.83 4.532c0-1.012 0.33-1.804 0.99-2.376 0.6746-0.5867 1.6133-0.924 2.816-1.012l3.344-0.242v-0.44c0-0.5573-0.1834-0.9973-0.55-1.32-0.352-0.3227-0.8654-0.484-1.54-0.484-0.5134 0-1.0194 0.088-1.518 0.264-0.4987 0.1613-0.9974 0.4107-1.496 0.748l-1.21-2.046c0.66-0.484 1.3713-0.85801 2.134-1.122 0.7626-0.264 1.5766-0.39599 2.442-0.39599 1.364 0 2.4566 0.3667 3.278 1.1 0.836 0.7333 1.254 1.7013 1.254 2.904v4.466c0 0.2053 0.0513 0.3667 0.154 0.484 0.1173 0.1173 0.2786 0.176 0.484 0.176h0.594v2.486h-1.342c-0.5427 0-1.0194-0.1173-1.43-0.352-0.4107-0.2493-0.7114-0.5793-0.902-0.99-0.396 0.4987-0.902 0.8947-1.518 1.188s-1.298 0.44-2.046 0.44c-1.1294 0-2.068-0.33-2.816-0.99s-1.122-1.4887-1.122-2.486zm2.75-0.022c0 0.396 0.1686 0.7113 0.506 0.946 0.3373 0.2347 0.7773 0.352 1.32 0.352 0.7186 0 1.3273-0.198 1.826-0.594 0.4986-0.4107 0.748-0.902 0.748-1.474v-0.726l-2.948 0.264c-0.484 0.044-0.8507 0.1687-1.1 0.374-0.2347 0.2053-0.352 0.4913-0.352 0.858zm21.739 3.212h-2.86v-1.056c-0.4987 0.4253-1.0633 0.7627-1.694 1.012-0.6307 0.2347-1.2907 0.352-1.98 0.352-0.3813 0-0.748-0.0367-1.1-0.11-0.352-0.0587-0.6967-0.1467-1.034-0.264s-0.6527-0.264-0.946-0.44-0.572-0.374-0.836-0.594-0.5133-0.462-0.748-0.726c-0.22-0.264-0.418-0.5427-0.594-0.836s-0.3227-0.6013-0.44-0.924c-0.1173-0.3373-0.2127-0.6747-0.286-1.012-0.0587-0.352-0.088-0.7113-0.088-1.078s0.0293-0.726 0.088-1.078c0.0733-0.352 0.1687-0.6893 0.286-1.012s0.264-0.6307 0.44-0.924 0.374-0.572 0.594-0.836c0.2347-0.264 0.484-0.506 0.748-0.726s0.5427-0.418 0.836-0.594 0.6087-0.32271 0.946-0.44001 0.682-0.20529 1.034-0.26399c0.352-0.0733 0.7187-0.11 1.1-0.11 0.6893 0 1.342 0.12469 1.958 0.37399 0.6307 0.2347 1.1953 0.55731 1.694 0.96801v-5.082h2.882v15.4zm-2.838-5.676c0-0.968-0.3373-1.782-1.012-2.442-0.6747-0.6747-1.4887-1.012-2.442-1.012-0.9387 0-1.7527 0.3373-2.442 1.012-0.6747 0.66-1.012 1.474-1.012 2.442 0 0.9533 0.3373 1.7747 1.012 2.464 0.6893 0.6747 1.5033 1.012 2.442 1.012 0.9533 0 1.7673-0.3373 2.442-1.012 0.6747-0.6893 1.012-1.5107 1.012-2.464zm4.4117-0.022c0-0.352 0.0293-0.6967 0.088-1.034s0.1467-0.6673 0.264-0.99 0.2567-0.6307 0.418-0.924c0.176-0.2933 0.3667-0.572 0.572-0.836 0.22-0.264 0.4547-0.506 0.704-0.726 0.264-0.22 0.5353-0.418 0.814-0.594 0.2933-0.176 0.6013-0.3227 0.924-0.44 0.3373-0.132 0.682-0.2273 1.034-0.286 0.352-0.0733 0.7113-0.11 1.078-0.11 0.4253 0 0.836 0.0367 1.232 0.11s0.77 0.1833 1.122 0.33 0.682 0.33 0.99 0.55c0.308 0.2053 0.5867 0.4473 0.836 0.726 0.264 0.264 0.4987 0.5573 0.704 0.88s0.374 0.6673 0.506 1.034c0.1467 0.3667 0.2567 0.7553 0.33 1.166s0.11 0.836 0.11 1.276v0.836h-8.778c0.1907 0.7333 0.572 1.342 1.144 1.826s1.254 0.726 2.046 0.726c0.6013 0 1.144-0.11 1.628-0.33 0.4987-0.2347 0.9533-0.6233 1.364-1.166l2.002 1.496c-0.572 0.7773-1.2833 1.386-2.134 1.826-0.836 0.4253-1.782 0.638-2.838 0.638-0.3813 0-0.7553-0.0293-1.122-0.088s-0.7187-0.1467-1.056-0.264-0.66-0.2567-0.968-0.418c-0.308-0.176-0.594-0.3667-0.858-0.572-0.264-0.22-0.5133-0.4547-0.748-0.704-0.22-0.264-0.418-0.5427-0.594-0.836s-0.3227-0.6013-0.44-0.924c-0.1173-0.3373-0.2127-0.6893-0.286-1.056-0.0587-0.3667-0.088-0.7407-0.088-1.122zm5.83-3.476c-0.6747 0-1.2687 0.2053-1.782 0.616-0.5133 0.396-0.8653 0.9387-1.056 1.628h5.83c-0.2053-0.704-0.5867-1.254-1.144-1.65-0.5427-0.396-1.1587-0.594-1.848-0.594zm17.994 1.936v7.238h-2.882v-6.666c0-0.7333-0.22-1.32-0.66-1.76-0.4254-0.4547-0.99-0.682-1.694-0.682-0.6894 0-1.2614 0.22-1.716 0.66-0.44 0.44-0.66 1.034-0.66 1.782v6.666h-2.882v-11.374h2.882v0.968c0.396-0.4107 0.858-0.72601 1.386-0.94601 0.5426-0.22 1.122-0.32999 1.738-0.32999 0.3373 0 0.6526 0.0293 0.946 0.088 0.308 0.0587 0.6013 0.1467 0.88 0.264 0.2786 0.1027 0.5353 0.2347 0.77 0.396 0.2346 0.1613 0.4473 0.3447 0.638 0.55 0.2053 0.1907 0.3813 0.4107 0.528 0.66 0.1613 0.2347 0.2933 0.484 0.396 0.748 0.1026 0.264 0.1833 0.5427 0.242 0.836 0.0586 0.2933 0.088 0.594 0.088 0.902zm4.4524 1.54c0 0.9533 0.33 1.7673 0.99 2.442 0.6747 0.6747 1.474 1.012 2.398 1.012 0.6013 0 1.144-0.132 1.628-0.396 0.4987-0.264 0.9093-0.6233 1.232-1.078l2.046 1.496c-0.572 0.748-1.2613 1.3567-2.068 1.826-0.792 0.4547-1.738 0.682-2.838 0.682-0.396 0-0.7773-0.0367-1.144-0.11-0.3667-0.0587-0.726-0.1467-1.078-0.264-0.3373-0.1173-0.66-0.264-0.968-0.44s-0.6013-0.374-0.88-0.594c-0.264-0.22-0.5133-0.462-0.748-0.726-0.22-0.264-0.418-0.5427-0.594-0.836s-0.33-0.6013-0.462-0.924c-0.1173-0.3227-0.2127-0.66-0.286-1.012-0.0587-0.352-0.088-0.7113-0.088-1.078s0.0293-0.726 0.088-1.078c0.0733-0.352 0.1687-0.6893 0.286-1.012 0.132-0.3227 0.286-0.6307 0.462-0.924s0.374-0.5647 0.594-0.814c0.2347-0.264 0.484-0.506 0.748-0.726 0.2787-0.22 0.572-0.418 0.88-0.594s0.6307-0.32271 0.968-0.44001c0.352-0.1173 0.7113-0.20529 1.078-0.26399 0.3667-0.0733 0.748-0.11 1.144-0.11 1.1 0 2.046 0.23469 2.838 0.70399 0.8067 0.4547 1.496 1.056 2.068 1.804l-2.046 1.496c-0.3227-0.4547-0.7333-0.814-1.232-1.078-0.484-0.264-1.0267-0.396-1.628-0.396-0.924 0-1.7233 0.3373-2.398 1.012-0.66 0.66-0.99 1.4667-0.99 2.42zm8.6556 0c0-0.352 0.0294-0.6967 0.088-1.034 0.0587-0.3373 0.1467-0.6673 0.264-0.99 0.1174-0.3227 0.2567-0.6307 0.418-0.924 0.176-0.2933 0.3667-0.572 0.572-0.836 0.22-0.264 0.4547-0.506 0.704-0.726 0.264-0.22 0.5354-0.418 0.814-0.594 0.2934-0.176 0.6014-0.3227 0.924-0.44 0.3374-0.132 0.682-0.2273 1.034-0.286 0.352-0.0733 0.7114-0.11 1.078-0.11 0.4254 0 0.836 0.0367 1.232 0.11s0.77 0.1833 1.122 0.33 0.682 0.33 0.99 0.55c0.308 0.2053 0.5867 0.4473 0.836 0.726 0.264 0.264 0.4987 0.5573 0.704 0.88 0.2054 0.3227 0.374 0.6673 0.506 1.034 0.1467 0.3667 0.2567 0.7553 0.33 1.166 0.0734 0.4107 0.11 0.836 0.11 1.276v0.836h-8.778c0.1907 0.7333 0.572 1.342 1.144 1.826s1.254 0.726 2.046 0.726c0.6014 0 1.144-0.11 1.628-0.33 0.4987-0.2347 0.9534-0.6233 1.364-1.166l2.002 1.496c-0.572 0.7773-1.2833 1.386-2.134 1.826-0.836 0.4253-1.782 0.638-2.838 0.638-0.3813 0-0.7553-0.0293-1.122-0.088-0.3666-0.0587-0.7186-0.1467-1.056-0.264-0.3373-0.1173-0.66-0.2567-0.968-0.418-0.308-0.176-0.594-0.3667-0.858-0.572-0.264-0.22-0.5133-0.4547-0.748-0.704-0.22-0.264-0.418-0.5427-0.594-0.836s-0.3226-0.6013-0.44-0.924c-0.1173-0.3373-0.2126-0.6893-0.286-1.056-0.0586-0.3667-0.088-0.7407-0.088-1.122zm5.83-3.476c-0.6746 0-1.2686 0.2053-1.782 0.616-0.5133 0.396-0.8653 0.9387-1.056 1.628h5.83c-0.2053-0.704-0.5866-1.254-1.144-1.65-0.5426-0.396-1.1586-0.594-1.848-0.594z"
              fill="#000"
            />
          </svg>
        </NextLink>
      }
    />
  );
}
