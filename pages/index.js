<section style={styles.grid}>
  <PlannerForm
    form={form}
    presets={presets}
    loading={loading}
    error={error}
    updateField={updateField}
    applyPreset={applyPreset}
    onSubmit={generatePlan}
  />

  <div style={styles.rightColumn}>
    <MealPlanResults
      plan={plan}
      onSave={savePlan}
      savedMessage={savedMessage}
    />
    <ShoppingListCard shoppingList={plan?.shopping_list} />
  </div>
</section>

<section style={styles.chatSection}>
  <CoachChat plan={plan} />
</section>
