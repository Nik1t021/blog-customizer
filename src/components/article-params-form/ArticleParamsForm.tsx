import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';

import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { FormEvent } from 'react';
import type { ArticleStateType } from '@/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onChange: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onChange,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [formState, setFormState] =
    useState<ArticleStateType>(defaultArticleState);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent): void => {
      const target = event.target;

      if (
        target instanceof Node &&
        !rootRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handleArrowClick = (): void => {
    setIsOpen((currentState) => !currentState);
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    onChange(formState);
  };

  const handleReset = (
    event: FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    setFormState(defaultArticleState);
    onChange(defaultArticleState);
  };

  return (
    <div ref={rootRef}>
      <ArrowButton
      isOpen={isOpen}
      onClick={handleArrowClick}
    />

    <aside 
    className={clsx(styles.container, {
      [styles.containerOpen]: isOpen,
    })}
    >
      <form 
      className={styles.form}
      onSubmit={handleSubmit}
      onReset={handleReset}
      >
        <Text
          as="h2"
          size={31}
          weight={800}
          uppercase
          >
            Настройки
          </Text>

          <div className={styles.paramsContainer}>
            <Select
              title="Шрифт"
              selected={formState.fontFamilyOption}
              options={fontFamilyOptions}
              onChange={(fontFamilyOption) =>
                setFormState((currentState) => ({
                  ...currentState,
                  fontFamilyOption,
                }))
              }
            />

            <RadioGroup
            title="Размер шрифта"
            name="font-size"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            onChange={(fontSizeOption) =>
              setFormState((currentState) => ({
                ...currentState,
                fontSizeOption,
              }))
            }
          />

          <Select
          title="Цвет шрифта"
          selected={formState.fontColor}
          options={fontColors}
          onChange={(fontColor) =>
            setFormState((currentState) => ({
              ...currentState,
              fontColor,
            }))
          }
        />

        <Separator />

        <Select
        title="Цвет фона"
        selected={formState.backgroundColor}
        options={backgroundColors}
        onChange={(backgroundColor) => 
          setFormState((currentState) => ({
            ...currentState,
            backgroundColor,
        }))
      }
    />

      <Select
        title="Ширина контента"
        selected={formState.contentWidth}
        options={contentWidthArr}
        onChange={(contentWidth) =>
          setFormState((currentState) => ({
            ...currentState,
            contentWidth,
          }))
        }
      />
  </div>
  
  <div className={styles.bottomContainer}>
    <Button
      title="Сбросить"
      htmlType="reset"
      type="clear"
    />

    <Button
      title="Применить"
      htmlType="submit"
      type="apply"
    />
  </div>
  </form>
</aside>
</div>
);
};

