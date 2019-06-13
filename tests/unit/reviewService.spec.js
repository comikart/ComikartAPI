const mockDb = require("mock-knex");

const knex = require("../../db/knex");
const service = require("../../api/services/reviewService");
const { development } = require("../../knexfile");

const tracker = mockDb.getTracker();
const db = knex(development);

beforeAll(() => mockDb.mock(db));

beforeEach(() => tracker.install());

afterEach(() => tracker.uninstall());

afterAll(() => mockDb.unmock(db));

describe("Test reviewService", () => {
    it("findAllReviews", (done) => {
        const reviews = [
            {
                product_id: 1,
                user_id: 1,
                score: 4,
                title: "this is a title",
                description: "description",
            },
            {
                product_id: 1,
                user_id: 2,
                score: 1,
                title: "a second title",
                description: "description",
            },
            {
                product_id: 1,
                user_id: 3,
                score: 5,
                title: "a third title",
                description: "description",
            },
            {
                product_id: 2,
                user_id: 2,
                score: 5,
                title: "best product ever!!",
                description: "very good product.",
            },
        ];

        tracker.on("query", (query) => {
            const regex = /select\s\*\sfrom\s"review"/;
            expect(regex.test(query.sql)).toBe(true);
            expect(query.method).toBe("select");
            query.response(reviews);
        });

        return service.findAllReviews().then((res) => {
            expect(res).toEqual(reviews);
            done();
        });
    });

    it("findReviewById", (done) => {
        const review = {
            product_id: 1,
            user_id: 1,
            score: 4,
            title: "this is a title",
            description: "description",
        };

        tracker.on("query", (query) => {
            const regex = /select\s\*\sfrom\s"review"\swhere\s"id"\s\=\s\$1/;
            expect(regex.test(query.sql)).toBe(true);
            expect(query.method).toBe("first");
            expect(query.bindings).toEqual([1, 1]);
            query.response(review);
        });

        return service.findReviewById(1).then((res) => {
            expect(res).toBe(review);
            done();
        });
    });

    it("findReviewByProductId", (done) => {
        const review = {
            product_id: 1,
            user_id: 1,
            score: 4,
            title: "this is a title",
            description: "description",
        };

        tracker.on("query", (query) => {
            const regex = /select\s\*\sfrom\s"review"\swhere\s"product_id"\s\=\s\$1/;

            expect(regex.test(query.sql)).toBe(true);
            expect(query.method).toBe("select");
            expect(query.bindings).toEqual([1]);
            query.response(review);
        });

        return service.findReviewByProductId(1).then((res) => {
            expect(res).toBe(review);
            done();
        });
    });

    it("findAllCommentsByReviewId", (done) => {
        const comments = [
            {
                user_id: 1,
                review_id: 1,
                description: "Hey, Friend! \n thats a good tip!",
            },
            {
                user_id: 3,
                review_id: 1,
                description: "well done on the review!",
            },
            {
                user_id: 2,
                review_id: 1,
                description: "awesome, review!",
            },
        ];

        tracker.on("query", (query) => {
            const regex = /select\s\*\sfrom\s"comment"\swhere\s"review_id"\s\=\s\$1\sorder\sby\s"date_created"\sasc/;

            expect(regex.test(query.sql)).toBe(true);
            expect(query.method).toBe("select");
            expect(query.bindings).toEqual([1]);
            query.response(comments);
        });

        return service.findAllCommentsByReviewId(1).then((res) => {
            expect(res).toBe(comments);
            done();
        });
    });

    it("findCommentById", (done) => {
        const comment = {
            user_id: 1,
            review_id: 1,
            description: "Hey, Friend! \n thats a good tip!",
        };

        tracker.on("query", (query) => {
            const regex = /select\s\*\sfrom\s"comment"\swhere\s"id"\s\=\s\$1/;

            expect(regex.test(query.sql)).toBe(true);
            expect(query.method).toBe("select");
            expect(query.bindings).toEqual([1]);
            query.response(comment);
        });

        return service.findCommentById(1).then((res) => {
            expect(res).toBe(comment);
            done();
        });
    });

    it("findAllHelpfulByReviewId", (done) => {
        const review = {
            product_id: 1,
            user_id: 1,
            score: 4,
            title: "this is a title",
            description: "description",
        };

        tracker.on("query", (query) => {
            const regex = /select\s\*\sfrom\s"helpful"\swhere\s"review_id"\s\=\s\$1/;

            expect(regex.test(query.sql)).toBe(true);
            expect(query.method).toBe("select");
            expect(query.bindings).toEqual([1]);
            query.response(review);
        });

        return service.findAllHelpfulByReviewId(1).then((res) => {
            expect(res).toBe(review);
            done();
        });
    });

    it("findReviewAndHelpfulById", (done) => {
        const review = {
            product_id: 1,
            user_id: 1,
            score: 4,
            title: "this is a title",
            description: "description",
        };

        tracker.on("query", (query) => {
            const regex = /SELECT\sreview\.\*\,\s\(SELECT\sCOUNT\(\*\)\sFROM\shelpful\sWHERE\shelpful\.review_id\s\=\s1\)\sas\slikes\sFROM\sreview\sWHERE\sreview.id\s\=\s1\sORDER\sBY\sdate_created/;

            expect(regex.test(query.sql)).toBe(true);
            expect(query.method).toBe("raw");
            expect(query.bindings).toEqual([]);
            query.response(review);
        });

        return service.findReviewAndHelpfulById(1).then((res) => {
            expect(res).toBe(review);
            done();
        });
    });

    it("countHelpfulByReviewId", (done) => {
        const review = {
            product_id: 1,
            user_id: 1,
            score: 4,
            title: "this is a title",
            description: "description",
        };

        tracker.on("query", (query) => {
            const regex = /select\scount\(\*\)\sfrom\s"helpful"\swhere\s"review_id"\s\=\s\$1\slimit\s\$2/;

            expect(regex.test(query.sql)).toBe(true);
            expect(query.method).toBe("first");
            expect(query.bindings).toEqual([1, 1]);
            query.response(review);
        });

        return service.countHelpfulByReviewId(1).then((res) => {
            expect(res).toBe(review);
            done();
        });
    });

    it("saveReview", (done) => {
        const review = {
            description: "description",
            product_id: 1,
            score: 4,
            title: "this is a title",
            user_id: 1,
        };

        tracker.on("query", (query) => {
            const regex = /insert\s\into\s"review"\s\("description"\,\s"product_id"\,\s"score"\,\s"title"\,\s"user_id"\)\svalues\s\(\$1\,\s\$2\,\s\$3\,\s\$4\,\s\$5\)/;

            expect(regex.test(query.sql)).toBe(true);
            expect(query.method).toBe("insert");
            expect(query.bindings).toEqual([...Object.values(review)]);
            query.response(review);
        });

        return service.saveReview(review).then((res) => {
            expect(res).toBe(review);
            done();
        });
    });

    it("saveComment", (done) => {
        const comment = {
            description: "Hey, Friend! \n thats a good tip!",
            review_id: 1,
            user_id: 1,
        };

        tracker.on("query", (query) => {
            const regex = /insert\s\into\s"comment"\s\("description"\,\s"review_id"\,\s"user_id"\)\svalues\s\(\$1\,\s\$2\,\s\$3\)/;

            expect(regex.test(query.sql)).toBe(true);
            expect(query.method).toBe("insert");
            expect(query.bindings).toEqual([...Object.values(comment)]);
            query.response(comment);
        });

        return service.saveComment(comment).then((res) => {
            expect(res).toBe(comment);
            done();
        });
    });

    it("saveHelpful", (done) => {
        const helpful = { review_id: 1, user_id: 2 };

        tracker.on("query", (query) => {
            const regex = /insert\s\into\s"helpful"\s\("review_id"\,\s"user_id"\)\svalues\s\(\$1\,\s\$2\)/;

            expect(regex.test(query.sql)).toBe(true);
            expect(query.method).toBe("insert");
            expect(query.bindings).toEqual([...Object.values(helpful)]);
            query.response(helpful);
        });

        return service.saveHelpful(helpful).then((res) => {
            expect(res).toBe(helpful);
            done();
        });
    });

    it("deleteReviewById", (done) => {
        const review = {
            description: "description",
            product_id: 1,
            score: 4,
            title: "this is a title",
            user_id: 1,
        };

        tracker.on("query", (query) => {
            const regex = /delete\sfrom\s"review"\swhere\s"id"\s\=\s\$1/;

            expect(regex.test(query.sql)).toBe(true);
            expect(query.method).toBe("del");
            expect(query.bindings).toEqual([review]);
            query.response(review);
        });

        return service.deleteReviewById(review).then((res) => {
            expect(res).toBe(review);
            done();
        });
    });

    it("deleteCommentById", (done) => {
        const comment = {
            description: "Hey, Friend! \n thats a good tip!",
            review_id: 1,
            user_id: 1,
        };

        tracker.on("query", (query) => {
            const regex = /delete\sfrom\s"comment"\swhere\s"id"\s\=\s\$1/;

            expect(regex.test(query.sql)).toBe(true);
            expect(query.method).toBe("del");
            expect(query.bindings).toEqual([comment]);
            query.response(comment);
        });

        return service.deleteCommentById(comment).then((res) => {
            expect(res).toBe(comment);
            done();
        });
    });

    it("deleteHelpful", (done) => {
        const helpful = { review_id: 1, user_id: 2 };

        tracker.on("query", (query) => {
            const regex = /delete\sfrom\s"helpful"\swhere\s"id"\s\=\s\$1/;
            console.log(query.sql);
            expect(regex.test(query.sql)).toBe(true);
            expect(query.method).toBe("del");
            expect(query.bindings).toEqual([helpful]);
            query.response(helpful);
        });

        return service.deleteHelpful(helpful).then((res) => {
            expect(res).toBe(helpful);
            done();
        });
    });
});
