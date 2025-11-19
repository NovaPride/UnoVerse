import type {
  Card,
  ColorTypes,
  DigitRange,
  SpecialContent,
} from "@shared/types/game";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { __SOCKET_SERVER_URL__, __SOCKET_SERVER_URL_LOCAL__ } from "./constants";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseCardId(cardId: string): Card {
  // Разбиваем ID на части по двоеточию
  const [color, content] = cardId.split(":");

  // Проверяем валидность цвета
  if (!isColorType(color)) {
    throw new Error(`Invalid color in cardId: ${color}`);
  }

  // Определяем тип карты и контент
  let type: "digit" | "special";
  let finalContent: DigitRange | SpecialContent;

  // Пробуем преобразовать content в число
  const digitValue = parseInt(content, 10);

  if (!isNaN(digitValue) && digitValue >= 0 && digitValue <= 9) {
    // Числовая карта
    type = "digit";
    finalContent = digitValue as DigitRange;
  } else {
    // Специальная карта
    type = "special";

    // Проверяем валидность специального контента
    if (!isSpecialContent(content)) {
      throw new Error(`Invalid card content in cardId: ${content}`);
    }

    finalContent = content;
  }

  return {
    id: cardId, // Используем исходный cardId как id
    type,
    color: color as ColorTypes,
    content: finalContent,
  };
}

// Вспомогательные функции для проверки типов
function isColorType(color: string): color is ColorTypes {
  return ["black", "red", "green", "blue", "yellow"].includes(color);
}

function isSpecialContent(content: string): content is SpecialContent {
  return ["skip", "reverse", "draw-two", "wild", "wild-draw-four"].includes(
    content,
  );
}

export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // Максимум и минимум включаются
}

export function getSocketServerUrl ()  {
  return import.meta.env.MODE === "development" ? __SOCKET_SERVER_URL_LOCAL__ : __SOCKET_SERVER_URL__;
}