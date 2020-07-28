class Song {
    constructor(artist,name,publicationDate){
        this.artist = artist;
        this.name = name;
        this.publicationDate = new Date(publicationDate);
    }
}

export default Song;