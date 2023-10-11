import React from 'react'

const Character = ({ element, name, image, withImageIsChecked, isShow }) => {


	return (
		<>
			<p className={`character__text --color-${element}`}>{name}</p>
			{withImageIsChecked && isShow && <img src={image} className="character__img" alt="" />}
			<div className="view">
				<img src={image} alt="" className="view__img" />
			</div>
		</>
	)
}

export default Character