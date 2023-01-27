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

Also a lhuge set of (both svg and font) app icons:
https://remixicon.com

## Flags

Many UX designers are against using flags for language selectors, because users can be offended (for instance showing a US flag for English to British people.)
I'm not sure if flags in language selectors help a user to find their language that more quickly. So it might be best not to use flags.
Using flags for country selectors is probably fine (though even there there are some controversies.)
See: https://www.flagsarenotlanguages.com/blog/

Flag svg files:
https://github.com/lipis/flag-icons/tree/main/flags/4x3

Place the icons inside /lib/components/icons/flags.
