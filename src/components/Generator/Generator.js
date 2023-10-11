import "./Generator.css";
import characters from '../../data/characters'
import Character from "../Character/Character";
import elements from '../../images/elements.png'
import { useState, useRef, useEffect } from "react";

function Generator() {
	const [characterInfo, setCharacterInfo] = useState({
		characterElement: '',
		characterName: '',
		characterImage: '',
	})

	const [withImageIsChecked, setWithImageIsChecked] = useState(false)

	const [isShow, setIsShow] = useState(false)

	const scrollBlock = useRef(null)

	useEffect(() => {
		scrollBlock.current?.scrollIntoView({ behavior: 'smooth' });
	}, [withImageIsChecked])

	function checkHandler() {
		setWithImageIsChecked(!withImageIsChecked);
	}

	function random(max) {
		const cryp = window.crypto || window.msCrypto;
		var tab = new Uint8Array(1);

		let num = Math.floor(cryp.getRandomValues(tab)[0] / 256 * max)
		return num;
	}

	function generateCharacter() {
		const randomCharacter = characters[random(characters.length)]
		const image = require(`../../images/characters/${randomCharacter.file}`)

		setCharacterInfo({ ...characterInfo, characterElement: randomCharacter.element, characterName: randomCharacter.name, characterImage: image })

		setIsShow(true)

		scrollBlock.current?.scrollIntoView({ behavior: 'smooth' });
	}

	return (
		<main className="wrapper">
			<section className="section-main">
				<div className="section-main__wrapper">
					{!isShow &&
						<>
							<a href="/">
								<h2 className="h2 --text-center">
									Сгенерировать персонажа Genshin Impact
								</h2>
							</a>

							<img
								src={elements}
								alt=""
								className="section-main__img"
							/>
						</>}

					<div className="character --text-center" ref={scrollBlock}>
						<Character
							element={characterInfo.characterElement}
							name={characterInfo.characterName}
							image={characterInfo.characterImage}
							withImageIsChecked={withImageIsChecked}
							isShow={isShow}
						/>
					</div>

					<div className="checkbox-wrapper" id="prev-show-wrapper">
						<label htmlFor="prev-show">{isShow ? 'Показать фотографию' : 'Сгенерировать персонажа с фотографией'}</label>
						<div className="checkbox">
							<input type="checkbox" id="prev-show" checked={withImageIsChecked} onChange={checkHandler} />
							<div className="checkmark"></div>
						</div>
					</div>

					<div className="--text-center">
						<button className="btn" id="btn" onClick={generateCharacter}>
							Сгенерировать
						</button>
					</div>
				</div>
			</section>
		</main>
	);
}

export default Generator;
