export namespace wire {

    export function fire ( etag: string, shout: any ) {
        if ( document.getElementById( 'stage' ) != undefined )
            document.getElementById( 'stage' )?.dispatchEvent(
            new CustomEvent( 're:' + etag, {
                detail : { what : shout },
                bubbles : true
            } )
        )
    }
}