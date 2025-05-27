import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  FocusEvent,
  useEffect,
} from "react";

interface TagInputProps {
  maxTags?: number;
  separator?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  maxTags = 10,
  separator = ",",
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        setWarning("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [warning]);

  const styles = {
    container: {
      display: "flex",
      flexWrap: "wrap",
      border: "1px solid #ccc",
      padding: "8px",
      borderRadius: "6px",
      gap: "6px",
      minHeight: "40px",
      fontFamily: "Prompt, sans-serif",
    } as React.CSSProperties,
    tag: {
      backgroundColor: "#f0f0f0",
      borderRadius: "4px",
      padding: "4px 8px",
      display: "flex",
      alignItems: "center",
      fontSize: "14px",
    } as React.CSSProperties,
    remove: {
      background: "none",
      border: "none",
      marginLeft: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      color: "#888",
    } as React.CSSProperties,
    input: {
      flex: 1,
      minWidth: "120px",
      border: "none",
      outline: "none",
      fontSize: "14px",
      fontFamily: "Prompt, sans-serif",
    } as React.CSSProperties,
    warning: {
      color: "red",
      fontSize: "13px",
      marginTop: "8px",
      fontFamily: "Prompt, sans-serif",
    } as React.CSSProperties,
  };

  const addTag = (value: string) => {
    const rawTags = value
      .split(separator)
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    let newTags = [...tags];
    let tagAdded = false;

    for (const tag of rawTags) {
      if (newTags.includes(tag)) continue;
      if (newTags.length >= maxTags) {
        setWarning(`You have reached the maximum allowed tags (${maxTags}).`);
        break;
      }
      newTags.push(tag);
      tagAdded = true;
    }

    if (tagAdded) {
      setTags(newTags);
      setWarning("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === separator) {
      e.preventDefault();

      if (tags.length >= maxTags) {
        setWarning(`You have reached the maximum allowed tags (${maxTags}).`);
        setInputValue("");
        return;
      }

      addTag(inputValue);
      setInputValue("");
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (inputValue.trim()) {
      if (tags.length >= maxTags) {
        setWarning(`You have reached the maximum allowed tags (${maxTags}).`);
        setInputValue("");
        return;
      }

      addTag(inputValue);
      setInputValue("");
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    setWarning("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div style={styles.container}>
        {tags.map((tag, index) => (
          <span key={index} style={styles.tag}>
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              style={styles.remove}
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder="Enter a tag"
          style={styles.input}
        />
      </div>
      {warning && <div style={styles.warning}>{warning}</div>}
    </>
  );
};

export default TagInput;
