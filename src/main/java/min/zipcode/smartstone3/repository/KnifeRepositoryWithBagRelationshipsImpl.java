package min.zipcode.smartstone3.repository;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import min.zipcode.smartstone3.domain.Knife;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class KnifeRepositoryWithBagRelationshipsImpl implements KnifeRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Knife> fetchBagRelationships(Optional<Knife> knife) {
        return knife.map(this::fetchStones);
    }

    @Override
    public Page<Knife> fetchBagRelationships(Page<Knife> knives) {
        return new PageImpl<>(fetchBagRelationships(knives.getContent()), knives.getPageable(), knives.getTotalElements());
    }

    @Override
    public List<Knife> fetchBagRelationships(List<Knife> knives) {
        return Optional.of(knives).map(this::fetchStones).orElse(Collections.emptyList());
    }

    Knife fetchStones(Knife result) {
        return entityManager
            .createQuery("select knife from Knife knife left join fetch knife.stones where knife is :knife", Knife.class)
            .setParameter("knife", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Knife> fetchStones(List<Knife> knives) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, knives.size()).forEach(index -> order.put(knives.get(index).getId(), index));
        List<Knife> result = entityManager
            .createQuery("select distinct knife from Knife knife left join fetch knife.stones where knife in :knives", Knife.class)
            .setParameter("knives", knives)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
