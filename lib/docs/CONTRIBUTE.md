# Docker

Uses Yarn instead of NPM.

// TODO


# Icons

Use SVG files as icons. Can be found here:

https://heroicons.dev
or do a Google search: https://www.google.com/search?q=svg+icon+arrow+down

Icons from HeroIcons (and other sites) must probably adapted a litte, especially the viewbox, so the size if similar to the other icons.
Probably: viewBox="2 2 20 20"
See NuIconPlusCircle.vue as areference.

Place the icons inside /lib/components/icons.

Test the icons next to all our icons:
http://127.0.0.1:8308/#/testicons

## Hero Icons

https://icon-sets.iconify.design/heroicons/banknotes/

https://heroicons.dev

## Remix Icons

https://icon-sets.iconify.design/ri/bold/

Also a huge set of (both svg and font) app icons:
https://remixicon.com

## Iconify

Iconify has icons from hundreds of icon sets (including Material, HeroIcons and RemixIcons):
https://iconify.design
And they have a library to make it very easy to include icons in a Vue/Vite project:
https://github.com/antfu/unplugin-icons
But in the end I decided to only use Iconify for searching icons and then copy the SVG files of the icons I need.

To find icons with Iconify:
https://icon-sets.iconify.design/?query=highlight

To find icons with Iconify for a specific set (like RemixIcon):
https://icon-sets.iconify.design/ri/bold/

## Flags

Many UX designers are against using flags for language selectors, because users can be offended (for instance showing a US flag for English to British people.)
I'm not sure if flags in language selectors help a user to find their language that more quickly. So it might be best not to use flags.
Using flags for country selectors is probably fine (though even there there are some controversies.)
See: https://www.flagsarenotlanguages.com/blog/

Flag svg files:
https://github.com/lipis/flag-icons/tree/main/flags/4x3

Place the icons inside /lib/components/icons/flags.
