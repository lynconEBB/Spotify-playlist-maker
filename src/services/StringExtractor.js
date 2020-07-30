import { stringifyUrl } from "query-string";

class StringExtractor {
    xkito() {
        console.log('xkito chamada');
    }

    extractNameAndArtist(title,channelName) {
        
        let [artist,songName] = title.split('-'); 
                    
        artist = artist.replace('&',' ');
        artist = artist.replace("'",'');
        artist = artist.replace(",",' ');
        artist = artist.replace(/\sx\s/,' ');

        songName = songName.replace(/'/g,'');
        
        
        let name,featuring = '';
        
        if (songName.includes('(')) {
            [name,featuring] = songName.split('(');
            featuring = featuring.replace('ft.' ,'');
            featuring = featuring.replace('feat.' ,'');
            featuring = featuring.replace('prod. by' ,'');
            featuring = featuring.replace('with' ,'');
            featuring = featuring.replace(')' ,'');

            artist = artist + featuring;
            songName = name;
        }
        if (songName.includes('ft.')) {
            [name,featuring] = songName.split('ft.');
            artist = artist + featuring;
            songName = name;
        }
        if (songName.includes('feat.')) {
            [name,featuring] = songName.split('feat.');
            artist = artist + featuring;
            songName = name;
        }
        if (name == undefined) {
            
            return [artist.trim(),songName.trim()];
        }
        return [artist.trim(),name.trim()];
    }
}

export default StringExtractor;

const stringExtractor =  new StringExtractor();
stringExtractor.extractNameAndArtist('gdkflgj  -gd gdf','xkito');