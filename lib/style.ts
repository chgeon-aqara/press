import {palette} from './palette';

export namespace style {

    var append = function ( src: any, dest:any ) {
        for ( var key in src ) {
            if ( src.hasOwnProperty( key ) ) {
                dest[ key ] = src[ key ];
            }
        }
    };

    var topx = function ( x: number | string ) {
        var s = x + '';
        if ( s.slice( -1 ) === '%' || s.slice( -2 ) === 'px' || s.slice( -2 ) == 'vw' || s.slice( -2 ) == 'vh' || s.slice( 0, 4 ) == 'calc' ) {
            return s;
        } else {
            return s + 'px';
        }
    };

    var Spec = function() {} as any;

    Spec.prototype.add = function( part: any ) {
        append( part, this )
        return this;
    };

    Spec.prototype.back = function( b: string ) {
        return this.add( { background: b })
    }

    Spec.prototype.set = function( p: number ) {
        switch ( p ) {
        case 0:
            return this.add( { position : 'absolute' } );
        case 1:
            return this.add( { position : 'fixed' } );
        case 2:
            return this.add( { position : 'relative' } );
        default:
            return this;
        }
    };

    Spec.prototype.pad = function( t?: number, r?:number, b?:number, l?:number ) {
        const p = {} as any;

        t && (p[ 'paddingTop' ] = t)
        r && (p[ 'paddingRight' ] = r)
        b && (p[ 'paddingBottom' ] = b)
        l && (p[ 'paddingLeft' ] = l)

        return this.add( p )
    }

    Spec.prototype.block = function ( w: number | string, h: number | string ) {
        return this.add( { width : topx( w ), height : topx( h ) } );
    };

    Spec.prototype.display = function ( s: 'flex' | 'grid' ) {
        return this.add( { display: s })
    }

    Spec.prototype.flex = function ( h?: string, v?: string ) {
        var s = { display: 'flex' } as any;

        if ( h ) s[ 'justifyContent' ] = h;
        if ( v ) s[ 'alignItems' ] = v;
        
        return this.add( s );
    }

    export function spec ( a?: any) {
        var s = new Spec();
        if( a ) {
            s.add( a );
        }
        return s;
    } 

    export function absolute() {
        return style.spec().set(0)
    }

    export function relative() {
        return style.spec().set(2)
    }

    
    export function landing() {
        return style.absolute().
            display( 'flex' )
            .block( '100vw', '100vh' )
            .add( { justifyContent: 'center', alignItems: 'center' } )
            .add( { backgroundImage: 'url(/back.png)', backgroundSize: '100vw 100vh' } );
    }

    export function panel() {
        const w = 1224;
        const h = w / 1.7
        return style.relative()
            .block( w, h )
            .display( 'grid' )
            .back( palette.white + '33' )
            .add( { 
                boxShadow: `0px 0px 10px rgba(0, 0, 0, 0.1)`,
                borderRadius: '8px', 
                overflow:'hidden', 
                gridTemplateColumns: 'minmax(400px, 3fr) 7fr' 
            }) 
    }

    export function stage() {
        return style.relative().display( 'flex' ).add( { 
            flexDirection: 'row',
            overflow: 'hidden',      
            height: '100%'      
        } )
    }
    //gap: 12, flex: 1, position:'relative', height: '100%', overflow:'hidden'
    export function body() {
        return style.relative().add( { 
            gap: 12,
            flex: 1,
            overflow: 'hidden',      
            height: '100%'      
        } )
    }

    export function side() {
        return style.relative()
            .block(180, '100vh')
            .back( palette.dark )
            .add( { 
                borderRight: `1px solid ${palette.grey}`,
                padding: 24,
                color: palette.white
            })            
    }

    export function head() {
        return style.relative().flex( 'left', 'center' )
            //.back( palette.dark )
            .pad( 24, 24, 24, 24 )
            .add({
                borderBottom: `1px solid ${palette.grey}`,
                marginBottom: 12,
            })
    }
}