import React from 'react';
import { Picker } from 'react-native';

const LanguageSelector = props => {
  const { initialValue, changeLanguage } = props;
  return (
    <Picker
      selectedValue={initialValue}
      onValueChange={changeLanguage}
      style={{ width: '50%' }}
    >
      <Picker.Item label="Afrikaans" value="af" />
      <Picker.Item label="Albanian" value="sq" />
      <Picker.Item label="Arabic" value="ar" />
      <Picker.Item label="Armenian" value="hy" />
      <Picker.Item label="Belarusian" value="be" />
      <Picker.Item label="Bengali" value="bn" />
      <Picker.Item label="Bulgarian" value="bg" />
      <Picker.Item label="Burmese" value="my" />
      <Picker.Item label="Chinese" value="zh" />
      <Picker.Item label="Croatian" value="hr" />
      <Picker.Item label="Czech" value="cs" />
      <Picker.Item label="Danish" value="da" />
      <Picker.Item label="Dutch" value="nl" />
      <Picker.Item label="English" value="en" />
      <Picker.Item label="Esperanto" value="eo" />
      <Picker.Item label="Finnish" value="fi" />
      <Picker.Item label="French" value="fr" />
      <Picker.Item label="German" value="de" />
      <Picker.Item label="Greek" value="el" />
      <Picker.Item label="Hebrew" value="he" />
      <Picker.Item label="Hindi" value="hi" />
      <Picker.Item label="Icelandic" value="is" />
      <Picker.Item label="Indonesian" value="id" />
      <Picker.Item label="Irish" value="ga" />
      <Picker.Item label="Italian" value="it" />
      <Picker.Item label="Japanese" value="ja" />
      <Picker.Item label="Korean" value="ko" />
      <Picker.Item label="Latin" value="la" />
      <Picker.Item label="Macedonian" value="mk" />
      <Picker.Item label="Maori" value="mi" />
      <Picker.Item label="Mongolian" value="mn" />
      <Picker.Item label="Norwegian" value="no" />
      <Picker.Item label="Polish" value="pl" />
      <Picker.Item label="Portuguese" value="pt" />
      <Picker.Item label="Romanian" value="ro" />
      <Picker.Item label="Russian" value="ru" />
      <Picker.Item label="Serbian" value="sr" />
      <Picker.Item label="Slovakian" value="sk" />
      <Picker.Item label="Slovenian" value="sl" />
      <Picker.Item label="Spanish" value="es" />
      <Picker.Item label="Swahili" value="sw" />
      <Picker.Item label="Swedish" value="sv" />
      <Picker.Item label="Tagalog" value="tl" />
      <Picker.Item label="Thai" value="th" />
      <Picker.Item label="Turkish" value="tr" />
      <Picker.Item label="Ukrainian" value="uk" />
      <Picker.Item label="Urdu" value="ur" />
      <Picker.Item label="Vietnamese" value="vi" />
      <Picker.Item label="Welsh" value="cy" />
      <Picker.Item label="Xhosa" value="xh" />
      <Picker.Item label="Yiddish" value="yi" />
    </Picker>
  );
};

export default LanguageSelector;
