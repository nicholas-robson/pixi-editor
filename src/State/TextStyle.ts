export type TextStyle = {
    fontFamily?: string | string[];
    fontSize?: number;
    fontStyle?: 'normal' | 'italic' | 'oblique';
    fontVariant?: 'normal' | 'small-caps';
    fontWeight?:
        | 'normal'
        | 'bold'
        | 'bolder'
        | 'lighter'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900';
    leading?: number;
    lineHeight?: number;
    lineJoin?: 'miter' | 'round' | 'bevel';
    miterLimit?: number;
    padding?: number;
    stroke?: number;
    strokeThickness?: number;
    trim?: boolean;
    textBaseline?: 'alphabetic';
    whiteSpace?: 'pre' | 'normal' | 'pre-line';
    wordWrap?: boolean;
    wordWrapWidth?: number;
    fill?: number;
    fillGradientType?: number;
    fillGradientStops?: number[];
    align?: 'left' | 'center' | 'right';
    breakWords?: boolean;
    dropShadow?: boolean;
    dropShadowAlpha?: number;
    dropShadowAngle?: number;
    dropShadowBlur?: number;
    dropShadowColor?: number;
    dropShadowDistance?: number;
};
