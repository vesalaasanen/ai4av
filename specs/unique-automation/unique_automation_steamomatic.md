---
spec_id: admin/unique_automation-steamomatic
schema_version: ai4av-public-spec-v1
revision: 1
title: "Unique Automation SteamOmatic Control Spec"
manufacturer: "Unique Automation"
model_family: SteamOmatic
aliases: []
compatible_with:
  manufacturers:
    - "Unique Automation"
  models:
    - SteamOmatic
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - uniqueautomation.eu
  - applicationmarket.crestron.com
source_urls:
  - https://uniqueautomation.eu/wp-content/uploads/2021/05/steamomatic_protocol.pdf
  - https://applicationmarket.crestron.com/content/Help/Unique_Automation/uniqueautomationsteamomaticv1.0help.pdf
  - https://applicationmarket.crestron.com/unique-automation-steamomatic/
retrieved_at: 2026-04-29T19:58:45.047Z
last_checked_at: 2026-04-30T09:50:56.242Z
generated_at: 2026-04-30T09:50:56.242Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:50:56.242Z
  matched_actions: 8
  action_count: 8
  confidence: high
  summary: "All 8 spec actions match source commands cleanly; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Unique Automation SteamOmatic Control Spec

## Summary
BOM2 protocol device for steam control. Supports TCP (ports 23/24) for command/response and UDP (ports 30303/30304) for discovery via UADDS. Frame format: `STI2_XXX[params]!` + `<0x0d>` terminator. Responses: `OK_XXX[params]<0x0d>`.

<!-- UNRESOLVED: device power commands not documented in source -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 23  # primary command port; port 24 also available
  discovery_port: 30303  # basic UADDS discovery
  discovery_extended_port: 30304  # extended UADDS
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred: command 100 stops heater, implies power control
- routable     # inferred: audio port selection (command 005)
- queryable    # inferred: query commands present (001?, 002?, 003?)
- levelable    # inferred: volume, brightness, temperature commands present
```

## Actions
```yaml
- id: set_desired_values
  label: Set Desired Values
  kind: action
  params:
    - name: temperature
      type: integer
      description: Temperature in Fahrenheit (0-999, 4-digit)
    - name: time
      type: integer
      description: Time in seconds (4-digit)

- id: set_colour_values
  label: Set Colour Values
  kind: action
  params:
    - name: colour_index
      type: integer
      description: Colour index (0-3)
    - name: brightness
      type: integer
      description: Brightness level

- id: set_audio_settings
  label: Set Audio Settings
  kind: action
  params:
    - name: volume
      type: integer
    - name: treble
      type: integer
    - name: bass
      type: integer
    - name: balance_sign
      type: string
      description: "+" or "-"
    - name: balance
      type: integer

- id: audio_ipod_cmd
  label: Audio iPod Command
  kind: action
  params:
    - name: cmd
      type: integer
      description: "0=forward, 1=back, 2=play/pause"

- id: set_audio_port
  label: Set Audio Port
  kind: action
  params:
    - name: port
      type: integer
      description: "0=Input A, 1=Input B, 2=iPod"

- id: start_preset
  label: Start Preset
  kind: action
  params:
    - name: preset_index
      type: integer
      description: Preset number (1-5)

- id: stop_steam
  label: Stop Steam System
  kind: action
  params: []

- id: change_unit
  label: Change Temperature Unit
  kind: action
  params:
    - name: unit
      type: integer
      description: "0=°C, 1=°F"
```

## Feedbacks
```yaml
- id: command_response
  type: enum
  values: [OK, ERR]
  description: Command acknowledgement

- id: query_response
  type: string
  description: Query response with parameter data

- id: current_values_response
  type: object
  description: |
    Response to query 001. Fields:
    - state: current state code
    - room_temp, desired_temp: temperature values
    - time: time in seconds
    - aroma_a, aroma_rate: aroma settings
    - colour_index, brightness: colour settings
    - audio_cmd: audio command state
    - port: audio port selection
    - total_color: total color count
    Fields 20-34: volume, bass, treble, balance, etc.

- id: preset_values_response
  type: object
  description: |
    Response to query 002. Returns preset values including:
    - time (seconds), temperature, preset name (max 15 chars)

- id: temperature_unit_response
  type: enum
  values: [C, F]
  description: Response to query 003 - current temperature unit
```

## Variables
```yaml
# UNRESOLVED: discrete settable parameters not separately enumerated in source
```

## Events
```yaml
# UNRESOLVED: unsolicited notifications not documented in source
```

## Macros
```yaml
# UNRESOLVED: multi-step sequences not explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings or interlock procedures not stated in source
```

## Notes
Device discovery via UADDS UDP broadcast on port 30303 (basic) and 30304 (extended). Extended response includes IP address and port availability status (p1=port23 busy, p2=port24 busy).

Frame format: `STI2_XXX[params]!` for commands, `STI2_XXX?` for queries. All frames end with `<0x0d>`. Response format: `OK_XXX[params]<0x0d>`.

Color index maps to real color via appendix (not included in source). State codes map to state names via appendix (not included in source).
<!-- UNRESOLVED: appendix mapping for state codes and colour indices not present in source -->

## Provenance

```yaml
source_domains:
  - uniqueautomation.eu
  - applicationmarket.crestron.com
source_urls:
  - https://uniqueautomation.eu/wp-content/uploads/2021/05/steamomatic_protocol.pdf
  - https://applicationmarket.crestron.com/content/Help/Unique_Automation/uniqueautomationsteamomaticv1.0help.pdf
  - https://applicationmarket.crestron.com/unique-automation-steamomatic/
retrieved_at: 2026-04-29T19:58:45.047Z
last_checked_at: 2026-04-30T09:50:56.242Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:50:56.242Z
matched_actions: 8
action_count: 8
confidence: high
summary: "All 8 spec actions match source commands cleanly; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
