export function IfRender ( { isRender, children, elsElement} ) {
    if ( isRender ) {
      return children;
    }
    return elsElement ? elsElement : null;
}
