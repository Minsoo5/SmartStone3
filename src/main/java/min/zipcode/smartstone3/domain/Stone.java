package min.zipcode.smartstone3.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Stone.
 */
@Entity
@Table(name = "stone")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Stone implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "grit_leve")
    private Integer gritLeve;

    @Column(name = "sharpness_limit")
    private Integer sharpnessLimit;

    @ManyToMany(mappedBy = "stones")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "stones" }, allowSetters = true)
    private Set<Knife> knives = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Stone id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getGritLeve() {
        return this.gritLeve;
    }

    public Stone gritLeve(Integer gritLeve) {
        this.setGritLeve(gritLeve);
        return this;
    }

    public void setGritLeve(Integer gritLeve) {
        this.gritLeve = gritLeve;
    }

    public Integer getSharpnessLimit() {
        return this.sharpnessLimit;
    }

    public Stone sharpnessLimit(Integer sharpnessLimit) {
        this.setSharpnessLimit(sharpnessLimit);
        return this;
    }

    public void setSharpnessLimit(Integer sharpnessLimit) {
        this.sharpnessLimit = sharpnessLimit;
    }

    public Set<Knife> getKnives() {
        return this.knives;
    }

    public void setKnives(Set<Knife> knives) {
        if (this.knives != null) {
            this.knives.forEach(i -> i.removeStone(this));
        }
        if (knives != null) {
            knives.forEach(i -> i.addStone(this));
        }
        this.knives = knives;
    }

    public Stone knives(Set<Knife> knives) {
        this.setKnives(knives);
        return this;
    }

    public Stone addKnife(Knife knife) {
        this.knives.add(knife);
        knife.getStones().add(this);
        return this;
    }

    public Stone removeKnife(Knife knife) {
        this.knives.remove(knife);
        knife.getStones().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Stone)) {
            return false;
        }
        return id != null && id.equals(((Stone) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Stone{" +
            "id=" + getId() +
            ", gritLeve=" + getGritLeve() +
            ", sharpnessLimit=" + getSharpnessLimit() +
            "}";
    }
}
