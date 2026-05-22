import React from "react";

export const useTranslations = () => (key: string) => key;

export const useLocale = () => "en";

export const useMessages = () => ({});

export const useNow = () => new Date();

export const useTimeZone = () => "UTC";

export const useFormatter = () => ({
  dateTime: jest.fn(),
  number: jest.fn(),
  relativeTime: jest.fn(),
  list: jest.fn(),
});

export const NextIntlClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => children;
