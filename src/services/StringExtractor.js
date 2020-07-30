class StringExtractor {

    removeMonsterCatBadge(song) {

    } 

    extractNameAndArtist(title,channelName) {
        
        title = title.replace(/[fF]t\./g ,' ');
        title = title.replace(/[Ff]eat./g ,' ');
        title = title.replace(/[pP]rod\. [bB]y/g ,' ');
        title = title.replace(/[Ww]ith/g ,'');
        title = title.replace(/[rR]emix/g ,' ');
        title = title.replace(/\([mM]usic [vV]ideo\)/g ,' ');
        title = title.replace(/[eE]dit\.?/g ,' ');
        title = title.replace(/\)/g ,'');
        title = title.replace(/\(/g ,'');
        title = title.replace(/-/g ,'');
        title = title.replace(/[lL]yrics/g,' ');
        title = title.replace(/&/g,' ');
        title = title.replace(/'/g,'');
        title = title.replace(/,/g,' ');
        title = title.replace(/\sx\s/,' ');
        
        title = title.replace(/\s{2,}/g,' ');
        
        return title.trim(); 
    }
}

export default StringExtractor;