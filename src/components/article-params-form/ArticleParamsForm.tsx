import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, { useState, useRef } from 'react';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	currentArticle: ArticleStateType;
	defaultState: ArticleStateType;
	setCurrentArticle: (article: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticle,
	defaultState,
	setCurrentArticle,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectArticleData, setSelectArticleData] = useState(currentArticle);
	const rootRef = useRef<HTMLDivElement>(null);

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setCurrentArticle({
			...selectArticleData,
		});
		setIsOpen(!isOpen);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(!isOpen),
		onChange: setIsOpen,
	});

	const resetState = () => {
		setSelectArticleData({
			...defaultState,
		});
		setCurrentArticle(defaultState);
		setIsOpen(!isOpen);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text size={31} weight={800} uppercase={true}>
						задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={selectArticleData.fontFamilyOption}
						onChange={(data) =>
							setSelectArticleData({
								...selectArticleData,
								fontFamilyOption: data,
							})
						}
						title='шрифт'
					/>
					<RadioGroup
						name='fontSizeRadio'
						title='размер шрифта'
						options={fontSizeOptions}
						selected={selectArticleData.fontSizeOption}
						onChange={(data) =>
							setSelectArticleData({
								...selectArticleData,
								fontSizeOption: data,
							})
						}
					/>
					<Select
						options={fontColors}
						selected={selectArticleData.fontColor}
						onChange={(data) =>
							setSelectArticleData({ ...selectArticleData, fontColor: data })
						}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={selectArticleData.backgroundColor}
						onChange={(data) =>
							setSelectArticleData({
								...selectArticleData,
								backgroundColor: data,
							})
						}
						title='цвет шрифта'
					/>
					<Select
						options={contentWidthArr}
						selected={selectArticleData.contentWidth}
						onChange={(data) =>
							setSelectArticleData({ ...selectArticleData, contentWidth: data })
						}
						title='цвет шрифта'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetState}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
