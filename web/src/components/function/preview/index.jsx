import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { camera_isload, camera_preview, camera_rotate, camera_filter, camera_images } from '../../../actions';

import { FiChevronDown, FiTrash2 } from 'react-icons/fi';
import './index.css';

const Preview = () => {
	const camera = useSelector(state => state.camera);
	const dispatch = useDispatch();

	let images = camera.images;
	const preview = camera.preview;
	const filter = camera.filter;
	const rotate = camera.rotate;

	const _handleRollback = () => {
		dispatch(camera_isload(true));
		dispatch(camera_preview(''));
		dispatch(camera_rotate(0));
	}

	const _handleDeleteImage = (name) => {
		for(let i = 0; i < images.length; i++) {
			if(images[i].data === name) {
				images.splice(i, 1);
				break;
			}
		}
		dispatch(camera_images(images));
		_handleRollback();
	}

	return (
		<div className='preview'>
			<img className={'preview-image preview-filter-' + filter + (rotate ? ' rotate' : '')} src={preview} alt='Rendered' />
			<FiChevronDown className='preview-rollback' onClick={ () => _handleRollback() } />
			<img className={'preview-filter preview-filter-' + filter + (rotate ? ' rotate' : '')} src={preview} alt='Rendered' onClick={ () => dispatch(camera_filter(filter === 2 ? 0 : filter + 1)) } / >
			<div className='preview-filter-title' onClick={ () => dispatch(camera_filter(filter === 2 ? 0 : filter + 1)) }>
				{filter === 0 ? 'Original' : ''}
				{filter === 1 ? 'Black & White' : ''}
				{filter === 2 ? 'Sephia' : ''}
			</div>
			<FiTrash2 className='preview-delete' onClick={ () => _handleDeleteImage(preview) } />
		</div>
	);
}

export default Preview;
