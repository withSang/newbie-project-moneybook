import React, { useState, useEffect } from 'react';
import PresetForm from '../components/PresetForm';
import PresetItem from '../components/PresetItem';
import axios from 'axios';

function PresetPage({ user, presets, setPresets }) {
    const { userID } = user;
    const [ presetToEdit, setPresetToEdit ] = useState(null);
    const [ presetModified, setPresetModified ] = useState(false);
    const [ presetItems, setPresetItems ] = useState([]);

    useEffect(() => {
        setPresetModified(true);
    }, [])

    useEffect(() => {
        if (presetModified) {
            axios.post('/api/preset/getAll',
            {userID: userID})
            .then((results) => {
                setPresets(results.data);
                setPresetModified(false);
            }).then(()=>{
                setPresetItems(presets.map((item, index) => {
                    return <PresetItem item={item} key={index} setPresetModified={setPresetModified} setPresetToEdit={setPresetToEdit}/>
                }));
            })
            .catch((error) => {
                return;
            })
            return;
        } else {
            // let newPresets = presets;
            // newPresets.sort((a,b) => a.name.localeCompare(b.name))
            // setPresets(newPresets)
        }
    }, [presetModified, presets, setPresets, userID]);

    return (
        <div>
            <h3>프리셋 추가하기</h3>
            <PresetForm user={user} setPresetModified={setPresetModified} presetToEdit={presetToEdit} setPresetToEdit={setPresetToEdit}/>
            <h3>프리셋 조회하기</h3>
            {presetItems}
        </div>
    )
}

export default PresetPage;
