package min.zipcode.smartstone3.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import min.zipcode.smartstone3.domain.enumeration.BevelSides;
import min.zipcode.smartstone3.domain.enumeration.CurrentSharpness;
import min.zipcode.smartstone3.domain.enumeration.DesiredOutCome;
import min.zipcode.smartstone3.domain.enumeration.KnifeSize;
import min.zipcode.smartstone3.domain.enumeration.KnifeStyle;
import min.zipcode.smartstone3.domain.enumeration.MetalType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Knife.
 */
@Entity
@Table(name = "knife")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Knife implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "knife_style")
    private KnifeStyle knifeStyle;

    @Enumerated(EnumType.STRING)
    @Column(name = "knife_size")
    private KnifeSize knifeSize;

    @Enumerated(EnumType.STRING)
    @Column(name = "metal_type")
    private MetalType metalType;

    @Enumerated(EnumType.STRING)
    @Column(name = "bevel_sides")
    private BevelSides bevelSides;

    @Enumerated(EnumType.STRING)
    @Column(name = "current_sharpness_level")
    private CurrentSharpness currentSharpnessLevel;

    @Enumerated(EnumType.STRING)
    @Column(name = "desired_outcome")
    private DesiredOutCome desiredOutcome;

    @Column(name = "starting_stone")
    private String startingStone;

    @Column(name = "middle_stone")
    private String middleStone;

    @Column(name = "finish_stone")
    private String finishStone;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "rel_knife__stone", joinColumns = @JoinColumn(name = "knife_id"), inverseJoinColumns = @JoinColumn(name = "stone_id"))
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "knives" }, allowSetters = true)
    private Set<Stone> stones = new HashSet<>();

    // cascading

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Knife id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public KnifeStyle getKnifeStyle() {
        return this.knifeStyle;
    }

    public Knife knifeStyle(KnifeStyle knifeStyle) {
        this.setKnifeStyle(knifeStyle);
        return this;
    }

    public void setKnifeStyle(KnifeStyle knifeStyle) {
        this.knifeStyle = knifeStyle;
    }

    public KnifeSize getKnifeSize() {
        return this.knifeSize;
    }

    public Knife knifeSize(KnifeSize knifeSize) {
        this.setKnifeSize(knifeSize);
        return this;
    }

    public void setKnifeSize(KnifeSize knifeSize) {
        this.knifeSize = knifeSize;
    }

    public MetalType getMetalType() {
        return this.metalType;
    }

    public Knife metalType(MetalType metalType) {
        this.setMetalType(metalType);
        return this;
    }

    public void setMetalType(MetalType metalType) {
        this.metalType = metalType;
    }

    public BevelSides getBevelSides() {
        return this.bevelSides;
    }

    public Knife bevelSides(BevelSides bevelSides) {
        this.setBevelSides(bevelSides);
        return this;
    }

    public void setBevelSides(BevelSides bevelSides) {
        this.bevelSides = bevelSides;
    }

    public CurrentSharpness getCurrentSharpnessLevel() {
        return this.currentSharpnessLevel;
    }

    public Knife currentSharpnessLevel(CurrentSharpness currentSharpnessLevel) {
        this.setCurrentSharpnessLevel(currentSharpnessLevel);
        return this;
    }

    public void setCurrentSharpnessLevel(CurrentSharpness currentSharpnessLevel) {
        this.currentSharpnessLevel = currentSharpnessLevel;
    }

    public DesiredOutCome getDesiredOutcome() {
        return this.desiredOutcome;
    }

    public Knife desiredOutcome(DesiredOutCome desiredOutcome) {
        this.setDesiredOutcome(desiredOutcome);
        return this;
    }

    public void setDesiredOutcome(DesiredOutCome desiredOutcome) {
        this.desiredOutcome = desiredOutcome;
    }

    public String getStartingStone() {
        return this.startingStone;
    }

    public Knife startingStone(String startingStone) {
        this.setStartingStone(startingStone);
        return this;
    }

    public void setStartingStone(String startingStone) {
        this.startingStone = startingStone;
    }

    public String getMiddleStone() {
        return this.middleStone;
    }

    public Knife middleStone(String middleStone) {
        this.setMiddleStone(middleStone);
        return this;
    }

    public void setMiddleStone(String middleStone) {
        this.middleStone = middleStone;
    }

    public String getFinishStone() {
        return this.finishStone;
    }

    public Knife finishStone(String finishStone) {
        this.setFinishStone(finishStone);
        return this;
    }

    public void setFinishStone(String finishStone) {
        this.finishStone = finishStone;
    }

    public Set<Stone> getStones() {
        return this.stones;
    }

    public void setStones(Set<Stone> stones) {
        this.stones = stones;
    }

    public Knife stones(Set<Stone> stones) {
        this.setStones(stones);
        return this;
    }

    public Knife addStone(Stone stone) {
        this.stones.add(stone);
        stone.getKnives().add(this);
        return this;
    }

    public Knife removeStone(Stone stone) {
        this.stones.remove(stone);
        stone.getKnives().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Knife)) {
            return false;
        }
        return id != null && id.equals(((Knife) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Knife{" +
            "id=" + getId() +
            ", knifeStyle='" + getKnifeStyle() + "'" +
            ", knifeSize='" + getKnifeSize() + "'" +
            ", metalType='" + getMetalType() + "'" +
            ", bevelSides='" + getBevelSides() + "'" +
            ", currentSharpnessLevel='" + getCurrentSharpnessLevel() + "'" +
            ", desiredOutcome='" + getDesiredOutcome() + "'" +
            ", startingStone='" + getStartingStone() + "'" +
            ", middleStone='" + getMiddleStone() + "'" +
            ", finishStone='" + getFinishStone() + "'" +
            "}";
    }
}
