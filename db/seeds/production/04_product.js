exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('product')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('product').insert([
        {
          publisher: 'DC Comics',
          isbn: '1834475',
          description:
            "True happiness begins in the heart. Our memories and emotions can play tricks on us, though, and divert one's reality into something completely different. The Batman Who Laughs has based his entire worldview on this very concept, and it is in this moment that he must finally confront the one man who stands in his way, the one man who could complete or halt his plan…the last Bruce Wayne. It is here, on the home turf of Wayne Manor, that Bruce relives the happiest moment of his life-the moment he became the Batman Who Laughs. Will Batman be able to outthink the Dark Multiverse version of himself and stop his most sinister end? Or will the original Dark Knight succumb fully and let go of his morality? While good almost always wins, this issue is the start of something more…setting up a larger plan based in the ultimate betrayal of infection, loyalty and true happiness. This is not the end…it's only the beginning.",
          author: 'Scott Snyder',
          issue: '6',
          series: 'The Batman Who Laughs',
          title: 'Batman Who Laughs',
          unit_price: 4.95,
          product_tax_code: '81100',
        },
      ]);
    });
};
